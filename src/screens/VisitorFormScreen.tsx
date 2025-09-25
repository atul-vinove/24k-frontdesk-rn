import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SignatureCanvas from 'react-native-signature-canvas';
import { z } from 'zod';
import { Button, Input, RadioButton } from '../components/ui';
import { SOURCES } from '../constants/sources';
import { theme } from '../constants/theme';
import { VISIT_PURPOSES } from '../constants/visitPurposes';
import { useAuthStore } from '../state/authStore';
import { useVisitorStore } from '../state/visitorStore';

// Validation schema
const visitorFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  purpose: z.string().min(1, 'Please select a purpose of visit'),
  source: z.string().min(1, 'Please select how you heard about us'),
  photo: z.string().min(1, 'Please take a photo'),
  signature: z.string().min(1, 'Please provide your signature'),
});

type VisitorFormData = z.infer<typeof visitorFormSchema>;

interface VisitorFormScreenProps {
  navigation?: {
    navigate: (screen: string) => void;
  };
}

export default function VisitorFormScreen({ navigation }: VisitorFormScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignaturePanel, setShowSignaturePanel] = useState(false);
  const [signatureData, setSignatureData] = useState('');
  const signatureRef = useRef<any>(null);
  const { user } = useAuthStore();
  const { addVisitor } = useVisitorStore();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<VisitorFormData>({
    resolver: zodResolver(visitorFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      purpose: '',
      source: '',
      photo: '',
      signature: '',
    },
  });

  const photoUri = watch('photo');

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is required to take photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        setValue('photo', result.assets[0].base64 || '');
      }
    } catch {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const handleSignatureOK = (signature: string) => {
    console.log('Signature captured:', signature);
    setSignatureData(signature);
    setValue('signature', signature);
    setShowSignaturePanel(false);
  };

  const handleSignatureEmpty = () => {
    console.log('Signature is empty');
    Alert.alert('Empty Signature', 'Please provide a signature before saving.');
  };

  const handleSignatureClear = () => {
    console.log('Signature cleared');
    setSignatureData('');
    setValue('signature', '');
  };

  const onSubmit = async (data: VisitorFormData) => {
    setIsLoading(true);
    try {
      const visitorData = {
        ...data,
        branch: user?.branch || '',
        timestamp: new Date(),
      };
      
      addVisitor(visitorData);
      
      Alert.alert(
        'Success',
        'Visitor information has been recorded successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setValue('name', '');
              setValue('email', '');
              setValue('phone', '');
              setValue('purpose', '');
              setValue('source', '');
              setValue('photo', '');
              setValue('signature', '');
              setSignatureData('');
            },
          },
        ]
      );
    } catch {
      Alert.alert('Error', 'Failed to submit visitor information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    const formData = watch();
    const hasData = Object.values(formData).some(value => value && value.toString().trim() !== '');
    
    if (hasData) {
      Alert.alert(
        'Reset Form',
        'Are you sure you want to reset the form? All filled data will be lost.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Reset',
            style: 'destructive',
            onPress: () => {
              reset();
              setSignatureData('');
              setValue('signature', '');
            },
          },
        ]
      );
    } else {
      // No data to reset, just clear the form silently
      reset();
      setSignatureData('');
      setValue('signature', '');
    }
  };

  if (showSignaturePanel) {
    return (
      <View style={styles.signatureContainer}>
        <View style={styles.signatureHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setShowSignaturePanel(false)}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.signatureTitle}>Please sign below</Text>
        </View>
        <View style={styles.signaturePanel}>
          <SignatureCanvas
            ref={signatureRef}
            onOK={handleSignatureOK}
            onEmpty={handleSignatureEmpty}
            onClear={handleSignatureClear}
            autoClear={false}
            descriptionText="Please sign above"
            clearText="Clear"
            confirmText="Save"
            webviewContainerStyle={{
              backgroundColor: theme.colors.background,
            }}
            webStyle={`
              .m-signature-pad {
                box-shadow: none;
                border: 2px solid ${theme.colors.border};
                border-radius: ${theme.borderRadius.medium}px;
                width: 100%;
                height: 100%;
              }
              .m-signature-pad--body {
                border: none;
                background-color: ${theme.colors.white};
              }
              .m-signature-pad--footer {
                color: ${theme.colors.text};
                background: ${theme.colors.background};
                display: flex;
                justify-content: space-between;
                padding: 10px;
              }
              .button {
                background-color: ${theme.colors.primary};
                color: white;
                border-radius: ${theme.borderRadius.small}px;
                padding: 12px 24px;
                margin: 5px;
                border: none;
                font-size: 16px;
                font-weight: bold;
                min-width: 80px;
              }
              .button.clear {
                background-color: ${theme.colors.error};
              }
              .button.save {
                background-color: ${theme.colors.primary};
              }
            `}
            style={styles.signatureCanvas}
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      enableOnAndroid={true}
      extraHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
              <View style={styles.headerContent}>
                <View style={styles.headerText}>
                  <Text style={styles.title}>Visitor Registration</Text>
                  <Text style={styles.subtitle}>Please fill in the required information</Text>
                </View>
              </View>
      </View>

      {/* Photo Section - Moved to top */}
      <View style={styles.photoSection}>
        <Text style={styles.photoLabel}>
          Photo <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.avatarContainer}>
          <TouchableOpacity style={styles.avatarButton} onPress={takePhoto}>
            {photoUri ? (
              <Image 
                source={{ uri: `data:image/jpeg;base64,${photoUri}` }} 
                style={styles.avatarImage} 
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>📷</Text>
                <Text style={styles.avatarPlaceholderLabel}>Tap to take photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {errors.photo && (
          <Text style={styles.errorText}>{errors.photo.message}</Text>
        )}
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.phone?.message}
              required
              keyboardType="phone-pad"
            />
          )}
        />

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email Address"
              placeholder="Enter your email (optional)"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="purpose"
          render={({ field: { onChange, value } }) => (
            <RadioButton
              label="Purpose of Visit"
              options={VISIT_PURPOSES}
              selectedValue={value}
              onValueChange={onChange}
              error={errors.purpose?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="source"
          render={({ field: { onChange, value } }) => (
            <RadioButton
              label="How did you hear about us?"
              options={SOURCES}
              selectedValue={value}
              onValueChange={onChange}
              error={errors.source?.message}
              required
            />
          )}
        />


        <View style={styles.signatureSection}>
          <Text style={styles.signatureLabel}>
            Digital Signature <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.signatureBox}
            onPress={() => setShowSignaturePanel(true)}
          >
            {signatureData ? (
              <View style={styles.signaturePreviewContainer}>
                <Image 
                  source={{ uri: signatureData }} 
                  style={styles.signaturePreview}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <Text style={styles.signaturePlaceholder}>Tap to sign</Text>
            )}
          </TouchableOpacity>
          {errors.signature && (
            <Text style={styles.errorText}>{errors.signature.message}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Reset"
            onPress={handleReset}
            variant="secondary"
            style={[styles.resetButton,{backgroundColor: theme.colors.error}]}
          />
          <Button
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={styles.submitButton}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.l,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.subtleText,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: theme.spacing.m,
    marginTop: theme.spacing.l,
  },
  resetButton: {
    flex: 1,
  },
  form: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  photoLabel: {
    ...theme.typography.label,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  required: {
    color: theme.colors.error,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatarButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.secondary,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  avatarPlaceholderLabel: {
    ...theme.typography.caption,
    color: theme.colors.subtleText,
    textAlign: 'center',
  },
  signatureSection: {
    marginBottom: theme.spacing.m,
  },
  signatureLabel: {
    ...theme.typography.label,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  signatureBox: {
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  signaturePlaceholder: {
    ...theme.typography.body,
    color: theme.colors.subtleText,
  },
  signaturePreview: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.s,
  },
  submitButton: {
    flex: 2,
  },
  signatureContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.l,
  },
  signatureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  backButton: {
    padding: theme.spacing.s,
    marginRight: theme.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    flex: 1,
    textAlign: 'center',
  },
  signaturePanel: {
    flex: 1,
  },
  signatureCanvas: {
    flex: 1,
    width: '100%',
  },
  signaturePreviewContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.s,
    width: '100%',
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

