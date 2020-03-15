//
//  ObjectPool.h
//  NativeObjectPool
//
//  Created by Juanchi Novas on 3/13/20.
//  Copyright © 2020 Juanchi Novas. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ObjectPool : NSObject
{
    NSLock *lock;
    NSMutableDictionary *pool;
}

- (bool)add:(NSString*)key withValue:(NSObject*)value;
- (NSObject *)get:(NSString *)key;
- (bool)remove:(NSString *)key;
- (void)removeAll;

+ (id)sharedInstance;

@end

