package com.antigravity.rbxcounter

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class RBXCounterApp : Application() {
    override fun onCreate() {
        super.onCreate()
        // Initialize Mobile Ads SDK
        com.google.android.gms.ads.MobileAds.initialize(this) {}
        
        // Initialize Firebase here once google-services.json is added
        // FirebaseApp.initializeApp(this)
    }
}
