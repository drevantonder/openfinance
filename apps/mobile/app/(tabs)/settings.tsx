import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TextInput, ScrollView, Pressable, Alert, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useModuleRegistry } from '@/contexts/module-registry-context';
import { useProviderRegistry } from '@/contexts/provider-registry-context';
import { useSession } from '@/contexts/session-context';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { session, setSession } = useSession();
  const moduleRegistry = useModuleRegistry();
  const providerRegistry = useProviderRegistry();
  const router = useRouter();

  const [moduleVariables, setModuleVariables] = useState<Record<string, Record<string, string>>>({});
  const [editingKey, setEditingKey] = useState<{ module: string; key: string } | null>(null);
  const [tempValue, setTempValue] = useState('');

  const loadModuleVariables = useCallback(async () => {
    const modules = moduleRegistry.getAll();
    const allVariables: Record<string, Record<string, string>> = {};

    for (const module of modules) {
      const provider = providerRegistry.getModuleVariablesProvider(module.id);
      const keys = await provider.listKeys();

      const moduleVars: Record<string, string> = {};
      for (const key of keys) {
        const value = await provider.get<string>(key);
        if (value !== null) {
          moduleVars[key] = value;
        }
      }

      if (Object.keys(moduleVars).length > 0) {
        allVariables[module.id] = moduleVars;
      }
    }

    setModuleVariables(allVariables);
  }, [moduleRegistry, providerRegistry]);

  useEffect(() => {
    loadModuleVariables();
  }, [loadModuleVariables]);

  const handleSignOut = async () => {
    const authProvider = providerRegistry.getAuthProvider();
    await authProvider.signOut();
    setSession(null);
    router.replace('/login');
  };

  const handleEdit = (module: string, key: string, currentValue: string) => {
    setEditingKey({ module, key });
    setTempValue(currentValue);
  };

  const handleSave = async () => {
    if (!editingKey) return;

    try {
      const { module, key } = editingKey;
      const provider = providerRegistry.getModuleVariablesProvider(module);
      await provider.set(key, tempValue);

      setModuleVariables((prev) => ({
        ...prev,
        [module]: {
          ...prev[module],
          [key]: tempValue,
        },
      }));

      setEditingKey(null);
      setTempValue('');
    } catch (error) {
      Alert.alert('Error', `Failed to save variable: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleCancel = () => {
    setEditingKey(null);
    setTempValue('');
  };

  const moduleSettingsSections = moduleRegistry.getSettingsSections();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Settings</ThemedText>
        <ThemedText style={styles.subtitle}>Account settings</ThemedText>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">User Access</ThemedText>
          <ThemedText style={styles.placeholderText}>
            User access management coming soon
          </ThemedText>
        </ThemedView>

        {moduleSettingsSections.map((section) => (
          <ThemedView key={section.id} style={styles.moduleSection}>
            <View style={styles.sectionHeader}>
              {section.icon && (
                <IconSymbol name={section.icon as any} size={24} color="#0a7ea4" />
              )}
              <ThemedText type="subtitle" style={section.icon ? styles.sectionTitle : undefined}>
                {section.label}
              </ThemedText>
            </View>
            {section.slug && (
              <ThemedText style={styles.sectionSlug}>
                {section.slug}
              </ThemedText>
            )}
            {section.description && (
              <ThemedText style={styles.sectionDescription}>
                {section.description}
              </ThemedText>
            )}
            {section.component && <section.component />}
          </ThemedView>
        ))}

        {Object.entries(moduleVariables).map(([moduleId, variables]) => (
          <ThemedView key={moduleId} style={styles.moduleSection}>
            <ThemedText type="subtitle">{moduleId}</ThemedText>
            {Object.entries(variables).map(([key, value]) => (
              <ThemedView key={key} style={styles.variableRow}>
                <ThemedText style={styles.variableKey}>{key}</ThemedText>
                {editingKey?.module === moduleId && editingKey?.key === key ? (
                  <ThemedView style={styles.editContainer}>
                    <TextInput
                      style={styles.textInput}
                      value={tempValue}
                      onChangeText={setTempValue}
                      onSubmitEditing={handleSave}
                      autoFocus
                    />
                    <Pressable onPress={handleSave} style={styles.saveButton}>
                      <ThemedText style={styles.saveButtonText}>Save</ThemedText>
                    </Pressable>
                    <Pressable onPress={handleCancel} style={styles.cancelButton}>
                      <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                    </Pressable>
                  </ThemedView>
                ) : (
                  <Pressable onPress={() => handleEdit(moduleId, key, value)} style={styles.valueContainer}>
                    <ThemedText style={styles.variableValue}>{value}</ThemedText>
                    <ThemedText style={styles.editHint}>Tap to edit</ThemedText>
                  </Pressable>
                )}
              </ThemedView>
            ))}
          </ThemedView>
        ))}

        {Object.keys(moduleVariables).length === 0 && (
          <ThemedText style={styles.noVariablesText}>
            No module variables found
          </ThemedText>
        )}

        <ThemedText style={styles.section}>Signed in as</ThemedText>
        <ThemedText style={styles.userId}>{session?.userId}</ThemedText>

        <ThemedView style={styles.spacer} />
        <ThemedText style={styles.signOutText} onPress={handleSignOut}>
          Sign out
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  content: {
    gap: 16,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.7,
  },
  section: {
    marginTop: 16,
  },
  moduleSection: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    marginLeft: 0,
  },
  sectionSlug: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 2,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  placeholderText: {
    fontSize: 14,
    opacity: 0.5,
    marginTop: 8,
  },
  variableRow: {
    marginTop: 12,
    gap: 4,
  },
  variableKey: {
    fontSize: 14,
    fontWeight: '600',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    minHeight: 40,
  },
  saveButton: {
    padding: 8,
    backgroundColor: '#0a7ea4',
    borderRadius: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  variableValue: {
    fontSize: 14,
    opacity: 0.8,
  },
  editHint: {
    fontSize: 12,
    opacity: 0.5,
  },
  noVariablesText: {
    fontSize: 14,
    opacity: 0.5,
    marginTop: 8,
  },
  userId: {
    fontSize: 18,
  },
  spacer: {
    height: 24,
  },
  signOutText: {
    fontSize: 16,
    color: '#0a7ea4',
  },
});
