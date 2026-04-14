def add_setting(settings: dict, key_value: tuple):
    """Add a new setting to the settings dictionary."""
    key, value = key_value
    key = key.lower()
    value = value.lower()
    
    if key in settings:
        return f"Setting '{key}' already exists! Cannot add a new setting with this name."
    
    settings[key] = value
    return f"Setting '{key}' added with value '{value}' successfully!"


def update_setting(settings: dict, key_value: tuple):
    """Update an existing setting in the settings dictionary."""
    key, value = key_value
    key = key.lower()
    value = value.lower()
    
    if key not in settings:
        return f"Setting '{key}' does not exist! Cannot update a non-existing setting."
    
    settings[key] = value
    return f"Setting '{key}' updated to '{value}' successfully!"


def delete_setting(settings: dict, key: str):
    """Delete a setting from the settings dictionary."""
    key = key.lower()
    
    if key not in settings:
        return "Setting not found!"
    
    del settings[key]
    return f"Setting '{key}' deleted successfully!"


def view_settings(settings: dict):
    """View all settings in the settings dictionary."""
    if not settings:
        return "No settings available."
    
    result = "Current User Settings:\n"
    for key, value in settings.items():
        result += f"{key.capitalize()}: {value}\n"
    
    return result.rstrip()+'\n'


if __name__ == "__main__":
    test_settings = {}
    
    # Test add_setting
    print(add_setting(test_settings, ("theme", "dark")))
    print(add_setting(test_settings, ("notifications", "enabled")))
    print(add_setting(test_settings, ("theme", "light")))  # Should fail - already exists
    
    # Test view_settings
    print(view_settings(test_settings))
    
    # Test update_setting
    print(update_setting(test_settings, ("theme", "light")))
    print(update_setting(test_settings, ("volume", "high")))  # Should fail - doesn't exist
    
    # Test delete_setting
    print(delete_setting(test_settings, ("notifications")))
    print(delete_setting(test_settings, ("volume")))  # Should fail - doesn't exist
    
    # Final view
    print(view_settings(test_settings))

    