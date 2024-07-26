import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { moderateScale } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

const FeedItem = ({ author, title, description, imageUrl, avatarUrl }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : null}
          <View style={styles.headerText}>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons
              name="ellipsis-vertical"
              size={moderateScale(24)}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : null}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons
              name="heart-outline"
              size={moderateScale(24)}
              color="#000"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons
              name="chatbubble-outline"
              size={moderateScale(24)}
              color="#000"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Icon name="send-o" size={moderateScale(24)} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons
            name="bookmark-outline"
            size={moderateScale(24)}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: moderateScale(15),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: '#FFFFE0', // Light yellow background
    borderColor: '#D3D3D3', // Grey border
    borderWidth: 1, // Border width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // for Android shadow
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20), // Half of the width/height to make it circular
    marginRight: moderateScale(10),
  },
  headerText: {
    flex: 1,
  },
  author: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginBottom: moderateScale(5),
  },
  headerButton: {
    marginRight: moderateScale(10),
  },
  image: {
    width: '100%',
    height: moderateScale(200),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  textContainer: {
    paddingHorizontal: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  description: {
    fontSize: moderateScale(14),
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: moderateScale(10),
    alignItems: 'center', // Ensure vertical alignment
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure vertical alignment
  },
  footerButton: {
    alignItems: 'center',
    marginRight: moderateScale(10), // Added for spacing between buttons
  },
});

export default FeedItem;
