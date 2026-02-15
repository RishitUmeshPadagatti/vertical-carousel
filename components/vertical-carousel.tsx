import React, { memo } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, SharedValue, withSpring, useDerivedValue } from 'react-native-reanimated';
import { Image } from 'expo-image';

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');
const ITEM_WIDTH = PAGE_WIDTH * 0.88;
const ITEM_HEIGHT = ITEM_WIDTH; // Perfectly square

interface CarouselItemProps {
    item: {
        id: string;
        source: string;
        user: {
            name: string;
            avatar: string;
        };
    };
    index: number;
    animationValue: SharedValue<number>;
}

const CarouselItem = memo(({ item, index, animationValue }: CarouselItemProps) => {
    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            animationValue.value,
            [-1, 0, 1, 2],
            [1, 1, 0.95, 0.9],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ scale }],
        };
    });

    return (
        <Animated.View style={[styles.itemWrapper, animatedStyle]}>
            <View style={styles.shadowContainer}>
                <View style={styles.itemContainer}>
                    <Image
                        source={{ uri: item.source }}
                        style={styles.image}
                        contentFit="cover"
                        transition={300}
                    />
                </View>
            </View>
        </Animated.View>
    );
});

const DATA = [
    {
        id: '1',
        source: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
        user: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    },
    {
        id: '2',
        source: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
        user: { name: 'James', avatar: 'https://i.pravatar.cc/150?u=james' },
    },
    {
        id: '3',
        source: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
        user: { name: 'Emma', avatar: 'https://i.pravatar.cc/150?u=emma' },
    }
];

export const VerticalCarousel = () => {
    const progressValue = useSharedValue<number>(0);

    const animationStyle = React.useCallback((value: number) => {
        'worklet';

        // zIndex should prioritize the active item (0) and then the stack
        const zIndex = interpolate(
            value,
            [-1, 0, 1, 2],
            [300, 200, 100, 50],
            Extrapolate.CLAMP
        );

        const translateY = interpolate(
            value,
            [-1, 0, 0.1, 1, 1.1, 2, 2.1, 3],
            [-PAGE_HEIGHT, 0, 30, 30, 55, 55, 75, 75],
            Extrapolate.CLAMP
        );

        const scale = interpolate(
            value,
            [-1, 0, 0.1, 1, 1.1, 2, 2.1, 3],
            [1, 1, 0.95, 0.95, 0.9, 0.9, 0.85, 0.85],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            value,
            [-1, 0, 0.1, 1, 1.1, 2, 2.1, 3],
            [1, 1, 0.9, 0.9, 0.8, 0.8, 0.7, 0.7],
            Extrapolate.CLAMP
        );

        return {
            transform: [
                { translateY },
                { scale },
            ],
            opacity,
            zIndex: Math.round(zIndex * 100),
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.carouselWrapper}>
                <Carousel
                    width={PAGE_WIDTH}
                    height={PAGE_HEIGHT}
                    vertical
                    loop={true}
                    autoPlay={false}
                    data={DATA.map((item) => item)}
                    pagingEnabled={true}
                    snapEnabled={true}
                    scrollAnimationDuration={150} // Even snappier card transitions
                    customAnimation={animationStyle}
                    onSnapToItem={(index) => {
                        progressValue.value = index;
                    }}
                    windowSize={10}
                    renderItem={({ item, index, animationValue }) => {
                        return (
                            <CarouselItem
                                item={item}
                                index={index}
                                animationValue={animationValue}
                            />
                        );
                    }}
                />

                {/* Vertical Progress Indicator */}
                <View style={styles.paginationContainer}>
                    {DATA.map((_, index) => {
                        return (
                            <PaginationItem
                                key={index}
                                index={index}
                                length={DATA.length}
                                animValue={progressValue}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

const PaginationItem = ({
    index,
    length,
    animValue,
}: {
    index: number;
    length: number;
    animValue: SharedValue<number>;
}) => {
    const isActive = useDerivedValue(() => animValue.value === index);

    const animatedStyle = useAnimatedStyle(() => {
        const active = isActive.value;

        return {
            width: withSpring(active ? 10 : 4, { damping: 20, stiffness: 400 }),
            opacity: withSpring(active ? 0.8 : 0.25, { damping: 20, stiffness: 400 }),
            height: 4,
            backgroundColor: active ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.4)',
        };
    });

    return (
        <Animated.View style={[styles.paginationDot, animatedStyle]} />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationContainer: {
        position: 'absolute',
        right: 8,
        top: 0,
        bottom: 100,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    paginationDot: {
        height: 4,
        borderRadius: 2,
    },
    itemWrapper: {
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT, // Matches viewport height to center item
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50, // Offset for header height
        paddingBottom: 180, // Offset for footer area
    },
    shadowContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.35,
        shadowRadius: 25,
        elevation: 12,
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: 56,
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
