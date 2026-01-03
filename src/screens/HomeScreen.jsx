import { getGroceryOrderLink } from '../utils/groceryOrderHelper';
import ToastLogo from '../components/ToastLogo';
  // Grocery order state
  const [groceryItems, setGroceryItems] = useState('');
  const [groceryProvider, setGroceryProvider] = useState('instacart');
  const [groceryOrderLink, setGroceryOrderLink] = useState('');
          {/* Grocery Ordering Feature */}
          <View style={{ marginTop: 32, width: '100%' }}>
            <Text style={styles.sectionTitle}>Order Groceries Online</Text>
            <TextInput
              style={styles.input}
              value={groceryItems}
              onChangeText={setGroceryItems}
              placeholder="Enter grocery items (comma separated)"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
              <Text>Provider:</Text>
              <Button
                title="Instacart"
                color={groceryProvider === 'instacart' ? '#388e3c' : '#888'}
                onPress={() => setGroceryProvider('instacart')}
              />
              <View style={{ width: 8 }} />
              <Button
                title="Walmart"
                color={groceryProvider === 'walmart' ? '#1976d2' : '#888'}
                onPress={() => setGroceryProvider('walmart')}
              />
            </View>
            <Button
              title="Get Order Link"
              onPress={() => {
                const items = groceryItems.split(',').map(s => s.trim()).filter(Boolean);
                if (items.length) {
                  setGroceryOrderLink(getGroceryOrderLink(items, groceryProvider));
                } else {
                  setGroceryOrderLink('');
                }
              }}
              disabled={!groceryItems}
            />
            {groceryOrderLink ? (
              <Text style={{ marginTop: 8, color: '#1976d2' }} onPress={() => {
                // Open link in browser (React Native Linking)
                if (window && window.open) window.open(groceryOrderLink, '_blank');
              }}>
                Tap here to order via {groceryProvider.charAt(0).toUpperCase() + groceryProvider.slice(1)}
              </Text>
            ) : null}
          </View>
import { getStressQuestions, getDestressMeasure, wellnessDisclaimer } from '../utils/acuteStress';


import React, { useState } from 'react';
import Toast from 'react-native-root-toast';
import { View, Text, StyleSheet, Button, TextInput, Switch, ActivityIndicator } from 'react-native';
import { fetchRestaurantMenu, suggestHealthyOptions } from '../utils/restaurantHelper';
import * as ImagePicker from 'expo-image-picker';
  // Menu image support
  const [menuImage, setMenuImage] = useState(null);
  const [menuImageText, setMenuImageText] = useState('');
  const [imageProcessing, setImageProcessing] = useState(false);
  // Simulated OCR and menu parsing (replace with real OCR integration if needed)
  async function processMenuImage(uri) {
    setImageProcessing(true);
    // Simulate OCR delay
    setTimeout(() => {
      // Simulate extracted text (in real use, replace with OCR result)
      const extractedText = 'Grilled Chicken Salad, Veggie Wrap, Cheeseburger, Fruit Parfait, Fried Chicken Basket';
      setMenuImageText('Extracted menu: ' + extractedText);
      // Parse menu items from text
      const items = extractedText.split(',').map(s => s.trim()).filter(Boolean).map(name => ({
        name,
        calories: undefined,
        isVegetarian: /veggie|fruit|salad/i.test(name),
        isVegan: /veggie|fruit|salad/i.test(name),
        isGlutenFree: /salad|fruit/i.test(name),
        description: ''
      }));
      setMenu(items);
      // Suggest healthy options from parsed items
      const healthy = suggestHealthyOptions(items, { calorieLimit: 600, avoid: ['fried', 'cheeseburger'], prefer: ['grilled', 'salad', 'veggie', 'wrap'] });
      setHealthyOptions(healthy);
      setImageProcessing(false);
    }, 2000);
  }
import ModeSwitch from '../components/ModeSwitch';
import { getRandomWellnessTip } from '../utils/wellnessTips';
import {
  getHydrationAdvice,
  getAlcoholAdvice,
  getSleepAdvice,
  getHealthyEatingAdvice,
  checkUnhealthyCoping,
  getPositiveCopingSkill
} from '../utils/wellnessCoach';

const HomeScreen = () => {
  const [isWellness, setIsWellness] = useState(false);
  // Weight loss/restaurant support state
  const [weightLossMode, setWeightLossMode] = useState(false);
  const [locationFinder, setLocationFinder] = useState(false);
  const [restaurantName, setRestaurantName] = useState('');
  const [menuLoading, setMenuLoading] = useState(false);
  const [menu, setMenu] = useState([]);
  const [healthyOptions, setHealthyOptions] = useState([]);
  const [menuError, setMenuError] = useState('');

  const [wellnessTip, setWellnessTip] = useState('');
  const [waterCups, setWaterCups] = useState('');
  const [alcoholDrinks, setAlcoholDrinks] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [meals, setMeals] = useState('');
  const [fruitsVeggies, setFruitsVeggies] = useState('');
  const [copingInput, setCopingInput] = useState('');
  const [copingWarning, setCopingWarning] = useState('');
  const [copingType, setCopingType] = useState('active');
  const [copingSuggestion, setCopingSuggestion] = useState('');

  const handleShowTip = () => {
    const tip = getRandomWellnessTip();
    setWellnessTip(tip);
    Toast.show(tip, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <View style={styles.container}>
      <ToastLogo width={56} height={56} />
      <Text style={styles.tagline}>A toast isn’t just a toast—unless it covers multiple needs.</Text>
      <Text style={styles.disclaimer}>
        <Text style={{fontWeight: 'bold'}}>Important:</Text> Mr. Nanny is here to empower and support you on your career journey. While we can’t guarantee a job offer from every interview, we promise to give you the best tools, guidance, and encouragement to help you grow, learn, and feel truly prepared for every opportunity ahead.
      </Text>
      <Text style={styles.text}>Home Screen</Text>
      <ModeSwitch isWellness={isWellness} onToggle={() => setIsWellness(w => !w)} />
      <Text style={styles.modeText}>
        {isWellness
          ? 'You are in Wellness Mode: Get healthy lifestyle tips, mindfulness, and self-care guidance.'
          : 'You are in Career Mode: Get job search, resume, and interview support.'}
      </Text>
      {isWellness && (
        <View style={styles.tipBox}>
          {/* Wellness Tip Card */}
          <View style={styles.card}>
            <Button title="Show Wellness Tip" onPress={handleShowTip} />
            {wellnessTip ? <Text style={styles.tip}>{wellnessTip}</Text> : null}
          </View>

          {/* Weight Loss Program Card */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Weight Loss Program</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>On Weight Loss Program?</Text>
              <Switch value={weightLossMode} onValueChange={setWeightLossMode} />
            </View>
            {weightLossMode && (
              <View style={{ marginLeft: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ flex: 1 }}>Enable Location Finder for Eating Out Support</Text>
                  <Switch value={locationFinder} onValueChange={setLocationFinder} />
                </View>
                {locationFinder && (
                  <View style={{ marginBottom: 8 }}>
                    <TextInput
                      style={styles.input}
                      value={restaurantName}
                      onChangeText={setRestaurantName}
                      placeholder="Enter restaurant name (e.g. Subway)"
                    />
                    <Button
                      title={menuLoading ? 'Loading...' : 'Find Menu & Healthy Options'}
                      onPress={async () => {
                        setMenuError('');
                        setMenu([]);
                        setHealthyOptions([]);
                        setMenuLoading(true);
                        try {
                          const menuData = await fetchRestaurantMenu(restaurantName, 'user-location');
                          setMenu(menuData);
                          const healthy = suggestHealthyOptions(menuData, { calorieLimit: 600, avoid: ['fried', 'dessert'], prefer: ['grilled', 'salad', 'veggie', 'wrap'] });
                          setHealthyOptions(healthy);
                        } catch (e) {
                          setMenuError('Could not fetch menu. Try again.');
                        }
                        setMenuLoading(false);
                      }}
                      disabled={!restaurantName || menuLoading}
                    />
                    {menuLoading && <ActivityIndicator style={{ marginTop: 8 }} />}
                    {menuError ? <Text style={{ color: '#b71c1c', marginTop: 8 }}>{menuError}</Text> : null}
                    {menu.length > 0 && (
                      <View style={{ marginTop: 12 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Menu:</Text>
                        {menu.map((item, idx) => (
                          <Text key={idx} style={{ fontSize: 14 }}>{item.name} ({item.calories ? item.calories + ' cal' : 'calories unknown'})</Text>
                        ))}
                      </View>
                    )}
                    {healthyOptions.length > 0 && (
                      <View style={{ marginTop: 12 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#388e3c' }}>Healthy Alternatives:</Text>
                        {healthyOptions.map((item, idx) => (
                          <Text key={idx} style={{ fontSize: 14, color: '#388e3c' }}>• {item.name} ({item.calories ? item.calories + ' cal' : 'calories unknown'})</Text>
                        ))}
                      </View>
                    )}
                    {/* Menu Image Upload Option */}
                    <View style={{ marginTop: 16 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Can't find the menu?</Text>
                      <Button
                        title="Take or Upload Menu Photo"
                        onPress={async () => {
                          let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: false,
                            quality: 1,
                          });
                          if (!result.canceled && result.assets && result.assets.length > 0) {
                            setMenuImage(result.assets[0].uri);
                            processMenuImage(result.assets[0].uri);
                          }
                        }}
                      />
                      {menuImage && (
                        <View style={{ alignItems: 'center', marginTop: 8 }}>
                          <Text>Menu Image Selected</Text>
                          <Image source={{ uri: menuImage }} style={{ width: 180, height: 120, marginVertical: 8, borderRadius: 8 }} />
                        </View>
                      )}
                      {imageProcessing && <ActivityIndicator style={{ marginTop: 8 }} />}
                      {menuImageText && (
                        <Text style={{ marginTop: 8, fontStyle: 'italic' }}>{menuImageText}</Text>
                      )}
                      <Text style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
                        (The bot will try to read the menu and suggest healthy options. For best results, use a clear photo.)
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Acute Stress Monitor Card */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Acute Stress Monitor</Text>
            {getStressQuestions().map((q, i) => (
              <Text key={i} style={styles.stressQ}>{q}</Text>
            ))}
            <Button title="Show Destressing Measure" onPress={() => setWellnessTip(getDestressMeasure())} />
          </View>

          {/* Track Your Wellness Card */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Track Your Wellness</Text>
            <TextInput
              style={styles.input}
              value={waterCups}
              onChangeText={setWaterCups}
              placeholder="How many cups of water today?"
              keyboardType="numeric"
            />
            {waterCups !== '' && <Text style={styles.tip}>{getHydrationAdvice(Number(waterCups))}</Text>}

            <TextInput
              style={styles.input}
              value={alcoholDrinks}
              onChangeText={setAlcoholDrinks}
              placeholder="How many alcoholic drinks today?"
              keyboardType="numeric"
            />
            {alcoholDrinks !== '' && <Text style={styles.tip}>{getAlcoholAdvice(Number(alcoholDrinks))}</Text>}

            <TextInput
              style={styles.input}
              value={sleepHours}
              onChangeText={setSleepHours}
              placeholder="How many hours did you sleep?"
              keyboardType="numeric"
            />
            {sleepHours !== '' && <Text style={styles.tip}>{getSleepAdvice(Number(sleepHours))}</Text>}

            <TextInput
              style={styles.input}
              value={meals}
              onChangeText={setMeals}
              placeholder="How many meals today?"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={fruitsVeggies}
              onChangeText={setFruitsVeggies}
              placeholder="How many fruits/veggies today?"
              keyboardType="numeric"
            />
            {meals !== '' && fruitsVeggies !== '' && <Text style={styles.tip}>{getHealthyEatingAdvice(Number(meals), Number(fruitsVeggies))}</Text>}
          </View>

          {/* Coping Skills Card */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Coping Skills Check</Text>
            <TextInput
              style={styles.input}
              value={copingInput}
              onChangeText={text => {
                setCopingInput(text);
                setCopingWarning(checkUnhealthyCoping(text));
              }}
              placeholder="Describe how you coped with stress today..."
              multiline
            />
            {copingWarning ? <Text style={[styles.tip, { color: '#d32f2f' }]}>{copingWarning}</Text> : null}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
              <Button title="Active Skill" onPress={() => {
                setCopingType('active');
                setCopingSuggestion(getPositiveCopingSkill('active'));
              }} />
              <View style={{ width: 12 }} />
              <Button title="Passive Skill" onPress={() => {
                setCopingType('passive');
                setCopingSuggestion(getPositiveCopingSkill('passive'));
              }} />
            </View>
            {copingSuggestion ? <Text style={styles.tip}>Try this {copingType} coping skill: {copingSuggestion}</Text> : null}
          </View>

          <Text style={styles.disclaimer}>{wellnessDisclaimer}</Text>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8E1' },
  tagline: { fontSize: 16, color: '#795548', textAlign: 'center', marginTop: 8, marginBottom: 8, fontStyle: 'italic', maxWidth: 320 },
  text: { fontSize: 24, marginBottom: 16, color: '#C68642' },
  modeText: { fontSize: 16, color: '#4E342E', marginTop: 16, textAlign: 'center', paddingHorizontal: 24 },
  tipBox: { marginTop: 24, alignItems: 'center', width: '100%', maxWidth: 400 },
  card: { backgroundColor: '#FFF8E1', borderRadius: 12, padding: 18, marginVertical: 12, width: '100%', shadowColor: '#C68642', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: '#F5DEB3' },
  tip: { marginTop: 12, fontSize: 16, color: '#388e3c', textAlign: 'center', backgroundColor: '#e8f5e9', padding: 12, borderRadius: 8, maxWidth: 320 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#795548' },
  input: { borderWidth: 1, borderColor: '#C68642', borderRadius: 8, padding: 10, marginBottom: 12, width: '100%', backgroundColor: '#FFF' },
  stressQ: { fontSize: 15, color: '#1976d2', marginBottom: 4, textAlign: 'left', width: '100%' },
  disclaimer: { marginTop: 24, fontSize: 13, color: '#b71c1c', textAlign: 'center', paddingHorizontal: 8 },
});

export default HomeScreen;
