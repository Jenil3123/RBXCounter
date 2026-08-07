package com.antigravity.rbxcounter.services.config

import android.util.Log
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class RemoteConfigManager @Inject constructor() {

    // private val remoteConfig = Firebase.remoteConfig

    // Default configuration values
    private val _dailyRewardAmount = MutableStateFlow(100)
    val dailyRewardAmount: StateFlow<Int> = _dailyRewardAmount.asStateFlow()

    private val _isLuckySpinEnabled = MutableStateFlow(true)
    val isLuckySpinEnabled: StateFlow<Boolean> = _isLuckySpinEnabled.asStateFlow()

    init {
        // Here we would fetch and activate Remote Config
        Log.d("RemoteConfig", "Remote config initialized with defaults")
        /*
        val configSettings = remoteConfigSettings {
            minimumFetchIntervalInSeconds = 3600
        }
        remoteConfig.setConfigSettingsAsync(configSettings)
        remoteConfig.setDefaultsAsync(R.xml.remote_config_defaults)
        
        remoteConfig.fetchAndActivate().addOnCompleteListener { task ->
            if (task.isSuccessful) {
                _dailyRewardAmount.value = remoteConfig.getLong("daily_reward_amount").toInt()
                _isLuckySpinEnabled.value = remoteConfig.getBoolean("lucky_spin_enabled")
            }
        }
        */
    }
}
