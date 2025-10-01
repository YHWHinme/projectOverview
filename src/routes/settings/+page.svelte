<script lang="ts">
  // Placeholder settings data
  let userSettings = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    theme: "light",
    notifications: {
      email: true,
      push: true,
      desktop: false
    },
    privacy: {
      profilePublic: false,
      activityTracking: true
    }
  };

  let appSettings = {
    language: "en",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",
    autoSave: true,
    compactView: false
  };

  function saveSettings() {
    // Placeholder save function
    console.log("Settings saved:", { userSettings, appSettings });
    // Show success message (in real app, this would be a toast/notification)
    alert("Settings saved successfully!");
  }

  function resetSettings() {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      // Reset to defaults
      console.log("Settings reset to defaults");
    }
  }
</script>

<svelte:head>
  <title>Settings - Project Overseer</title>
</svelte:head>

<div class="max-w-4xl">
  <h1 class="text-3xl font-bold mb-6 text-gray-800">Settings</h1>

  <div class="space-y-6">
    <!-- Profile Settings -->
    <div class="bg-white rounded-lg shadow-md">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">Profile Settings</h2>
      </div>
      <div class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              bind:value={userSettings.name}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              bind:value={userSettings.email}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span class="text-gray-600 font-medium">{userSettings.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <button class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
              Upload Photo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Appearance Settings -->
    <div class="bg-white rounded-lg shadow-md">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">Appearance</h2>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
          <div class="flex space-x-4">
            <label class="flex items-center">
              <input 
                type="radio" 
                bind:group={userSettings.theme} 
                value="light"
                class="mr-2"
              />
              <span class="text-sm">Light</span>
            </label>
            <label class="flex items-center">
              <input 
                type="radio" 
                bind:group={userSettings.theme} 
                value="dark"
                class="mr-2"
              />
              <span class="text-sm">Dark</span>
            </label>
            <label class="flex items-center">
              <input 
                type="radio" 
                bind:group={userSettings.theme} 
                value="auto"
                class="mr-2"
              />
              <span class="text-sm">Auto</span>
            </label>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <label class="block text-sm font-medium text-gray-700">Compact View</label>
            <p class="text-xs text-gray-500">Use a more compact layout to show more information</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" bind:checked={appSettings.compactView} class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Notification Settings -->
    <div class="bg-white rounded-lg shadow-md">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">Notifications</h2>
      </div>
      <div class="p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email Notifications</label>
            <p class="text-xs text-gray-500">Receive updates and notifications via email</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" bind:checked={userSettings.notifications.email} class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <label class="block text-sm font-medium text-gray-700">Push Notifications</label>
            <p class="text-xs text-gray-500">Receive push notifications on your devices</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" bind:checked={userSettings.notifications.push} class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <label class="block text-sm font-medium text-gray-700">Desktop Notifications</label>
            <p class="text-xs text-gray-500">Show desktop notifications when app is running</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" bind:checked={userSettings.notifications.desktop} class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Application Settings -->
    <div class="bg-white rounded-lg shadow-md">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">Application Settings</h2>
      </div>
      <div class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select 
              bind:value={appSettings.language}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select 
              bind:value={appSettings.timezone}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="UTC-8">Pacific Time (UTC-8)</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC+0">GMT (UTC+0)</option>
              <option value="UTC+1">Central European (UTC+1)</option>
            </select>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <label class="block text-sm font-medium text-gray-700">Auto Save</label>
            <p class="text-xs text-gray-500">Automatically save changes as you work</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" bind:checked={appSettings.autoSave} class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Save/Reset Buttons -->
    <div class="flex justify-end space-x-3">
      <button 
        on:click={resetSettings}
        class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700"
      >
        Reset to Defaults
      </button>
      <button 
        on:click={saveSettings}
        class="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
      >
        Save Settings
      </button>
    </div>
  </div>
</div>