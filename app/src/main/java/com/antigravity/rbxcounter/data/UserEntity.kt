package com.antigravity.rbxcounter.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey val id: Int = 1,
    val balance: Int = 0,
    val lastDailyRewardTime: Long = 0,
    val totalSpins: Int = 0
)
