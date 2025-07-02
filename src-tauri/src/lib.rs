// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Manager;
use std::sync::Mutex;
use serde::{Serialize, Deserialize};

// Define structures for browser state
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BrowserSettings {
    pub block_trackers: bool,
    pub block_ads: bool,
    pub https_only: bool,
    pub do_not_track: bool,
    pub custom_user_agent: Option<String>,
}

impl Default for BrowserSettings {
    fn default() -> Self {
        Self {
            block_trackers: true,
            block_ads: true,
            https_only: true,
            do_not_track: true,
            custom_user_agent: None,
        }
    }
}

// State management
struct BrowserState(Mutex<BrowserSettings>);

// Browser commands
#[tauri::command]
fn get_browser_settings(state: tauri::State<BrowserState>) -> Result<BrowserSettings, String> {
    match state.0.lock() {
        Ok(settings) => Ok(settings.clone()),
        Err(_) => Err("Failed to access browser settings".into()),
    }
}

#[tauri::command]
fn update_browser_settings(
    settings: BrowserSettings,
    state: tauri::State<BrowserState>,
) -> Result<(), String> {
    match state.0.lock() {
        Ok(mut current_settings) => {
            *current_settings = settings;
            Ok(())
        }
        Err(_) => Err("Failed to update browser settings".into()),
    }
}

#[tauri::command]
fn check_url_safety(url: &str) -> bool {
    // In a real implementation, this would check against a database of malicious sites
    // For now, we'll just do a simple check for demonstration
    !url.contains("malware") && !url.contains("phishing")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(BrowserState(Mutex::new(BrowserSettings::default())))
        .invoke_handler(tauri::generate_handler![
            get_browser_settings,
            update_browser_settings,
            check_url_safety
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
