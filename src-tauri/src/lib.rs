use base64::Engine;
use screenshots::Screen;
use tauri::{Manager, WebviewWindow};
use tauri_plugin_autostart::ManagerExt;

const CHAT_W: u32 = 340;
const CHAT_H: u32 = 440;
const BUBBLE_H: i32 = 90;

fn get_primary_screen() -> Option<Screen> {
    Screen::all().ok()?.into_iter().next()
}

fn work_area_bottom(app: &tauri::AppHandle) -> i32 {
    if let Ok(Some(monitor)) = app.primary_monitor() {
        let wa = monitor.work_area();
        return wa.position.y + wa.size.height as i32;
    }
    get_primary_screen()
        .map(|s| s.display_info.height as i32 - 48)
        .unwrap_or(1032)
}

#[tauri::command]
fn take_screenshot() -> Result<String, String> {
    let screen = get_primary_screen().ok_or("No screen found")?;
    let capture = screen.capture().map_err(|e| format!("Capture failed: {e}"))?;
    let img = image::DynamicImage::ImageRgba8(
        image::RgbaImage::from_raw(capture.width(), capture.height(), capture.to_vec())
            .ok_or("Failed to create image buffer")?,
    );
    let img = if img.width() > 1024 {
        let ratio = 1024.0 / img.width() as f64;
        img.resize(1024, (img.height() as f64 * ratio) as u32, image::imageops::FilterType::Lanczos3)
    } else { img };
    let mut buf = std::io::Cursor::new(Vec::new());
    img.write_to(&mut buf, image::ImageFormat::Png).map_err(|e| format!("PNG encode failed: {e}"))?;
    Ok(format!("data:image/png;base64,{}", base64::engine::general_purpose::STANDARD.encode(buf.into_inner())))
}

#[tauri::command]
fn move_window(app: tauri::AppHandle, label: String, x: f64, y: f64) -> Result<(), String> {
    let win: WebviewWindow = app.get_webview_window(&label).ok_or(format!("Window '{label}' not found"))?;
    win.set_position(tauri::Position::Physical(tauri::PhysicalPosition { x: x as i32, y: y as i32 }))
        .map_err(|e| format!("Move failed: {e}"))
}

#[tauri::command]
fn resize_pet_window(app: tauri::AppHandle, w: u32, h: u32) -> Result<(), String> {
    let win: WebviewWindow = app.get_webview_window("main").ok_or("Main window not found")?;
    let screen = get_primary_screen().ok_or("No screen")?;
    let sw = screen.display_info.width;
    let bottom = work_area_bottom(&app);
    win.set_size(tauri::Size::Physical(tauri::PhysicalSize { width: w, height: h }))
        .map_err(|e| format!("Resize failed: {e}"))?;
    win.set_position(tauri::Position::Physical(tauri::PhysicalPosition {
        x: (sw / 2 - w / 2) as i32,
        y: bottom - h as i32,
    })).map_err(|e| format!("Position failed: {e}"))
}

#[tauri::command]
fn set_bubble_mode(app: tauri::AppHandle, active: bool, pet_x: i32, pet_h: u32) -> Result<(), String> {
    let win: WebviewWindow = app.get_webview_window("main").ok_or("Main window not found")?;
    let bottom = work_area_bottom(&app);
    let screen = get_primary_screen().ok_or("No screen")?;
    let sw = screen.display_info.width as i32;

    if active {
        let new_h = pet_h + BUBBLE_H as u32;
        let new_y = bottom - new_h as i32;
        let clamped_x = pet_x.max(0).min(sw - pet_h as i32);
        win.set_size(tauri::Size::Physical(tauri::PhysicalSize { width: pet_h, height: new_h }))
            .map_err(|e| format!("Resize failed: {e}"))?;
        win.set_position(tauri::Position::Physical(tauri::PhysicalPosition {
            x: clamped_x,
            y: new_y.max(0),
        })).map_err(|e| format!("Position failed: {e}"))
    } else {
        let new_y = bottom - pet_h as i32;
        win.set_size(tauri::Size::Physical(tauri::PhysicalSize { width: pet_h, height: pet_h }))
            .map_err(|e| format!("Resize failed: {e}"))?;
        win.set_position(tauri::Position::Physical(tauri::PhysicalPosition {
            x: pet_x.max(0).min(sw - pet_h as i32),
            y: new_y,
        })).map_err(|e| format!("Position failed: {e}"))
    }
}

#[tauri::command]
fn toggle_chat(app: tauri::AppHandle, show: bool, johnny_x: Option<f64>) -> Result<(), String> {
    let chat: WebviewWindow = app.get_webview_window("chat").ok_or("Chat window not found")?;
    if show {
        let screen = get_primary_screen().ok_or("No screen")?;
        let sw = screen.display_info.width as i32;
        let bottom = work_area_bottom(&app);
        let pet_h = if let Some(pet) = app.get_webview_window("main") {
            pet.outer_size().map(|s| s.height).unwrap_or(200)
        } else { 200 };
        let center_x = johnny_x.unwrap_or((sw / 2) as f64) as i32;
        let chat_x = (center_x - CHAT_W as i32 / 2).max(10).min(sw - CHAT_W as i32 - 10);
        let chat_y = (bottom - pet_h as i32 - CHAT_H as i32 - 10).max(10);
        let _ = chat.set_position(tauri::Position::Physical(tauri::PhysicalPosition { x: chat_x, y: chat_y }));
        chat.show().map_err(|e| format!("Show failed: {e}"))?;
        chat.set_focus().map_err(|e| format!("Focus failed: {e}"))?;
    } else {
        chat.hide().map_err(|e| format!("Hide failed: {e}"))?;
    }
    Ok(())
}

#[tauri::command]
fn get_pet_position(app: tauri::AppHandle) -> Result<(i32, i32), String> {
    let win: WebviewWindow = app.get_webview_window("main").ok_or("Main window not found")?;
    let pos = win.outer_position().map_err(|e| format!("Position failed: {e}"))?;
    Ok((pos.x, pos.y))
}

#[tauri::command]
fn get_screen_size(app: tauri::AppHandle) -> Result<(u32, u32), String> {
    let screen = get_primary_screen().ok_or("No screen found")?;
    let sw = screen.display_info.width;
    let bottom = work_area_bottom(&app);
    Ok((sw, bottom as u32))
}

#[tauri::command]
fn set_autostart(app: tauri::AppHandle, enabled: bool) -> Result<(), String> {
    let manager = app.autolaunch();
    if enabled {
        manager.enable().map_err(|e| format!("Enable autostart failed: {e}"))
    } else {
        manager.disable().map_err(|e| format!("Disable autostart failed: {e}"))
    }
}

#[tauri::command]
fn get_autostart(app: tauri::AppHandle) -> Result<bool, String> {
    app.autolaunch().is_enabled().map_err(|e| format!("Get autostart failed: {e}"))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_autostart::init(tauri_plugin_autostart::MacosLauncher::LaunchAgent, None))
        .invoke_handler(tauri::generate_handler![
            take_screenshot,
            move_window,
            resize_pet_window,
            set_bubble_mode,
            toggle_chat,
            get_pet_position,
            get_screen_size,
            set_autostart,
            get_autostart,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
