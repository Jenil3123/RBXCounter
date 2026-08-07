package com.antigravity.rbxcounter.core

import kotlinx.coroutines.flow.Flow

interface UseCase<in P, R> {
    suspend operator fun invoke(parameters: P): R
}

interface FlowUseCase<in P, R> {
    operator fun invoke(parameters: P): Flow<Result<R>>
}
