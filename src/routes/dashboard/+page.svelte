<script lang="ts">
    import { goto } from "$app/navigation";
    // Dashboard logic will go here
</script>

<svelte:head>
    <title>Dashboard - Project Overseer</title>
</svelte:head>

<div class="max-w-6xl">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Stats Cards -->
        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-600">Total Projects</p>
                    <p class="text-2xl font-bold text-gray-800">12</p>
                </div>
                <div class="bg-blue-100 rounded-full p-3">
                    <span class="text-blue-600 text-xl">📁</span>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-600">Active Tasks</p>
                    <p class="text-2xl font-bold text-gray-800">24</p>
                </div>
                <div class="bg-green-100 rounded-full p-3">
                    <span class="text-green-600 text-xl">✅</span>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-600">Completed</p>
                    <p class="text-2xl font-bold text-gray-800">156</p>
                </div>
                <div class="bg-purple-100 rounded-full p-3">
                    <span class="text-purple-600 text-xl">🎉</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Welcome Section -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Welcome to Project Overseer</h2>
        <p class="text-gray-600 mb-4">
            Manage your projects and tasks efficiently with our integrated
            dashboard.
        </p>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
        <div class="space-y-3">
            <div class="flex items-center space-x-3 text-sm">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-gray-600"
                    >Project "Website Redesign" created</span
                >
                <span class="text-gray-400">2 hours ago</span>
            </div>
            <div class="flex items-center space-x-3 text-sm">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-gray-600"
                    >Task "Update database schema" completed</span
                >
                <span class="text-gray-400">4 hours ago</span>
            </div>
            <div class="flex items-center space-x-3 text-sm">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-gray-600"
                    >New team member added to "Mobile App"</span
                >
                <span class="text-gray-400">1 day ago</span>
            </div>
        </div>
    </div>
</div>
