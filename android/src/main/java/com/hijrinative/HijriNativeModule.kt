package com.hijrinative

import com.facebook.react.bridge.ReactApplicationContext

class HijriNativeModule(reactContext: ReactApplicationContext) :
  NativeHijriNativeSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeHijriNativeSpec.NAME
  }
}
