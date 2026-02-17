package com.hijrinative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableNativeMap
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.chrono.HijrahChronology
import java.time.chrono.HijrahDate
import java.time.temporal.ChronoField

class HijriNativeModule(reactContext: ReactApplicationContext) :
  NativeHijriNativeSpec(reactContext) {

  private fun hijriToMap(date: HijrahDate): WritableNativeMap {
    val map = WritableNativeMap()
    map.putInt("year", date.get(ChronoField.YEAR))
    map.putInt("month", date.get(ChronoField.MONTH_OF_YEAR))
    map.putInt("day", date.get(ChronoField.DAY_OF_MONTH))
    return map
  }

  private fun gregorianToMap(date: LocalDate): WritableNativeMap {
    val map = WritableNativeMap()
    map.putInt("year", date.year)
    map.putInt("month", date.monthValue)
    map.putInt("day", date.dayOfMonth)
    return map
  }

  override fun toHijri(year: Double, month: Double, day: Double): WritableNativeMap {
    val gregorian = LocalDate.of(year.toInt(), month.toInt(), day.toInt())
    val hijri = HijrahDate.from(gregorian)
    return hijriToMap(hijri)
  }

  override fun toGregorian(year: Double, month: Double, day: Double): WritableNativeMap {
    val hijri = HijrahChronology.INSTANCE.date(year.toInt(), month.toInt(), day.toInt())
    val gregorian = LocalDate.from(hijri)
    return gregorianToMap(gregorian)
  }

  override fun fromTimestamp(timestamp: Double, timezone: String): WritableNativeMap {
    val instant = Instant.ofEpochSecond(timestamp.toLong())
    val zone = ZoneId.of(timezone)
    val localDate = instant.atZone(zone).toLocalDate()
    val hijri = HijrahDate.from(localDate)
    return hijriToMap(hijri)
  }

  override fun getDaysInMonth(month: Double, year: Double): Double {
    val hijri = HijrahChronology.INSTANCE.date(year.toInt(), month.toInt(), 1)
    return hijri.lengthOfMonth().toDouble()
  }

  override fun today(timezone: String): WritableNativeMap {
    val zone = ZoneId.of(timezone)
    val localDate = LocalDate.now(zone)
    val hijri = HijrahDate.from(localDate)
    return hijriToMap(hijri)
  }

  companion object {
    const val NAME = NativeHijriNativeSpec.NAME
  }
}
