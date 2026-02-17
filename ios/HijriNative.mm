#import "HijriNative.h"

static NSCalendar *hijriCalendar;
static NSCalendar *gregorianCalendar;
static NSUInteger const kDateComponents = NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay;

@implementation HijriNative

+ (void)initialize {
  hijriCalendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSCalendarIdentifierIslamicUmmAlQura];
  gregorianCalendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSCalendarIdentifierGregorian];
}

- (NSDictionary *)toHijri:(double)year month:(double)month day:(double)day {
  NSDateComponents *greg = [[NSDateComponents alloc] init];
  greg.year = (NSInteger)year;
  greg.month = (NSInteger)month;
  greg.day = (NSInteger)day;

  NSDate *date = [gregorianCalendar dateFromComponents:greg];
  NSDateComponents *hijri = [hijriCalendar components:kDateComponents fromDate:date];

  return @{
    @"year": @(hijri.year),
    @"month": @(hijri.month),
    @"day": @(hijri.day)
  };
}

- (NSDictionary *)toGregorian:(double)year month:(double)month day:(double)day {
  NSDateComponents *hijri = [[NSDateComponents alloc] init];
  hijri.year = (NSInteger)year;
  hijri.month = (NSInteger)month;
  hijri.day = (NSInteger)day;

  NSDate *date = [hijriCalendar dateFromComponents:hijri];
  NSDateComponents *greg = [gregorianCalendar components:kDateComponents fromDate:date];

  return @{
    @"year": @(greg.year),
    @"month": @(greg.month),
    @"day": @(greg.day)
  };
}

- (NSDictionary *)fromTimestamp:(double)timestamp timezone:(NSString *)timezone {
  NSDate *date = [NSDate dateWithTimeIntervalSince1970:timestamp];

  NSCalendar *cal = [hijriCalendar copy];
  cal.timeZone = [NSTimeZone timeZoneWithName:timezone];

  NSDateComponents *hijri = [cal components:kDateComponents fromDate:date];

  return @{
    @"year": @(hijri.year),
    @"month": @(hijri.month),
    @"day": @(hijri.day)
  };
}

- (NSNumber *)getDaysInMonth:(double)month year:(double)year {
  NSDateComponents *hijri = [[NSDateComponents alloc] init];
  hijri.year = (NSInteger)year;
  hijri.month = (NSInteger)month;
  hijri.day = 1;

  NSDate *date = [hijriCalendar dateFromComponents:hijri];
  NSRange range = [hijriCalendar rangeOfUnit:NSCalendarUnitDay
                                      inUnit:NSCalendarUnitMonth
                                     forDate:date];

  return @(range.length);
}

- (NSDictionary *)today:(NSString *)timezone {
  NSCalendar *cal = [hijriCalendar copy];
  cal.timeZone = [NSTimeZone timeZoneWithName:timezone];

  NSDateComponents *hijri = [cal components:kDateComponents fromDate:[NSDate date]];

  return @{
    @"year": @(hijri.year),
    @"month": @(hijri.month),
    @"day": @(hijri.day)
  };
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeHijriNativeSpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"HijriNative";
}

@end
