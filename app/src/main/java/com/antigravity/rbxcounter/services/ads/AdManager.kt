package com.antigravity.rbxcounter.services.ads

import android.app.Activity
import android.content.Context
import android.util.Log
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.rewarded.RewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AdManager @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private var rewardedAd: RewardedAd? = null
    private var isAdLoading = false

    // Test Ad Unit ID for Rewarded Ads
    private val REWARDED_AD_UNIT_ID = "ca-app-pub-3940256099942544/5224354917"

    fun loadRewardedAd() {
        if (rewardedAd != null || isAdLoading) {
            return
        }

        isAdLoading = true
        val adRequest = AdRequest.Builder().build()

        RewardedAd.load(
            context,
            REWARDED_AD_UNIT_ID,
            adRequest,
            object : RewardedAdLoadCallback() {
                override fun onAdLoaded(ad: RewardedAd) {
                    Log.d("AdManager", "Rewarded ad loaded.")
                    rewardedAd = ad
                    isAdLoading = false
                }

                override fun onAdFailedToLoad(error: LoadAdError) {
                    Log.d("AdManager", "Rewarded ad failed to load: ${error.message}")
                    rewardedAd = null
                    isAdLoading = false
                }
            }
        )
    }

    fun showRewardedAd(activity: Activity, onRewardEarned: (Int) -> Unit) {
        rewardedAd?.let { ad ->
            ad.show(activity) { rewardItem ->
                // For this test, we can use the default reward amount
                onRewardEarned(rewardItem.amount)
                Log.d("AdManager", "User earned reward: ${rewardItem.amount}")
            }
            // Nullify the ad to load a fresh one next time
            rewardedAd = null
            loadRewardedAd()
        } ?: run {
            Log.d("AdManager", "The rewarded ad wasn't ready yet.")
            // Try loading again
            loadRewardedAd()
        }
    }
}
