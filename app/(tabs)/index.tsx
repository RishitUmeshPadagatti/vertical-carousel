import { View, StyleSheet, Dimensions, Pressable, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { VerticalCarousel } from '@/components/vertical-carousel';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width: PAGE_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            {/* Carousel Section - Put it first so it stays in background or just rely on zIndex */}
            <View style={styles.carouselSection}>
                <VerticalCarousel />
            </View>

            {/* Header Section */}
            <SafeAreaView style={styles.headerWrapper}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100?u=me' }}
                        style={styles.profileIcon}
                        contentFit="cover"
                    />

                    <View style={styles.centerBadge}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/100?u=group' }}
                            style={styles.groupIcon}
                        />
                        <View style={styles.badgeLabelContainer}>
                            <ThemedText style={styles.badgeText}>XOXO</ThemedText>
                            <Ionicons name="chevron-forward" size={12} color="#fff" />
                        </View>
                    </View>

                    <View style={styles.iconButton}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
                    </View>
                </View>
            </SafeAreaView>

            {/* Footer Section */}
            <View style={styles.footer}>
                <View style={styles.bottomProfileOuter}>
                    <View style={styles.bottomProfileInner}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?u=current' }}
                            style={styles.bottomProfileImage}
                        />
                    </View>
                </View>

                <Pressable style={styles.globeButton}>
                    <Ionicons name="globe-outline" size={28} color="#ffffffff" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    headerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        height: 80,
    },
    profileIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#333',
    },
    centerBadge: {
        alignItems: 'center',
    },
    groupIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        marginBottom: 4,
    },
    badgeLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
    },
    badgeText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselSection: {
        ...StyleSheet.absoluteFillObject,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingBottom: 40,
        gap: 30,
        zIndex: 1000,
    },
    bottomProfileOuter: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 7,
        borderColor: '#52fb03ff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    bottomProfileInner: {
        width: 88,
        height: 88,
        borderRadius: 44,
        borderWidth: 2,
        borderColor: '#666',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    bottomProfileImage: {
        width: '100%',
        height: '100%',
    },
    globeButton: {
        width: 120,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 5,
    },
});
