import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { categories } from '../data/events';

const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',
  secondary: '#CC0000',
  text: '#000000',
  textSecondary: '#555555',
};

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 4 }}
    >
      {categories.map((category) => {
        const isSelected = category.id === selectedCategory;
        
        return (
          <TouchableOpacity
            key={category.id}
            onPress={() => onSelectCategory(category.id)}
            className={`mr-2 px-4 py-2 rounded-full ${isSelected ? 'bg-secondary' : 'bg-surface'} ${isSelected ? 'shadow-md' : ''}`}
            style={{ borderWidth: isSelected ? 0 : 1, borderColor: '#e0e0e0' }}
          >
            <Text className={`${isSelected ? 'text-white font-bold' : 'text-text'}`}>
              {category.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
