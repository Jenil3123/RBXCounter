package com.antigravity.rbxcounter.navigation

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Settings : Screen("settings")
    object Rewards : Screen("rewards")
}
