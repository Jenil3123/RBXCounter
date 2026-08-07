package com.antigravity.rbxcounter.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.antigravity.rbxcounter.ui.screens.HomeScreen

@Composable
fun AppNavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = Screen.Home.route
    ) {
        composable(route = Screen.Home.route) {
            HomeScreen(navController = navController)
        }
        composable(route = Screen.Settings.route) {
            com.antigravity.rbxcounter.ui.screens.SettingsScreen(navController = navController)
        }
        composable(route = Screen.Rewards.route) {
            com.antigravity.rbxcounter.ui.screens.RewardsScreen(navController = navController)
        }
    }
}
