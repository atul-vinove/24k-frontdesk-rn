import { FlashList } from '@shopify/flash-list';
import React, { useMemo, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Input } from '../components/ui';
import { SOURCES } from '../constants/sources';
import { theme } from '../constants/theme';
import { VISIT_PURPOSES } from '../constants/visitPurposes';
import { useVisitorStore } from '../state/visitorStore';
import { VisitorFormData } from '../types';

// Visitor card component for FlashList
interface VisitorCardProps {
  visitor: VisitorFormData;
  index: number;
}

function VisitorCard({ visitor }: VisitorCardProps) {
  const getPurposeLabel = (value: string) => {
    const purpose = VISIT_PURPOSES.find(p => p.value === value);
    return purpose?.label || value;
  };

  const getSourceLabel = (value: string) => {
    const source = SOURCES.find(s => s.value === value);
    return source?.label || value;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <View style={styles.visitorCard}>
      <View style={styles.visitorHeader}>
        <View style={styles.visitorInfo}>
          <Text style={styles.visitorName}>{visitor.name}</Text>
          <Text style={styles.visitorDate}>
            {formatDate(visitor.timestamp)}
          </Text>
        </View>
        {visitor.photo && (
          <Image
            source={{ uri: `${visitor.photo}` }}
            style={styles.visitorPhoto}
          />
        )}
      </View>

      <View style={styles.visitorDetails}>
        {visitor.email && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{visitor.email}</Text>
          </View>
        )}

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{visitor.phone}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Branch:</Text>
          <Text style={styles.detailValue}>{visitor.branch}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Purpose:</Text>
          <Text style={styles.detailValue}>
            {getPurposeLabel(visitor.purpose)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Source:</Text>
          <Text style={styles.detailValue}>
            {getSourceLabel(visitor.source)}
          </Text>
        </View>

      </View>

        <View style={styles.signatureContainer}>
          <Text style={styles.signatureLabel}>Signature:</Text>
          <Image
            source={{ uri: visitor.signature }}
            style={styles.signatureImage}
          />
        </View>
    </View>
  );
}

export default function HistoryScreen() {
  const { getRecentVisitors } = useVisitorStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Get all visitors and filter based on search query
  const allVisitors = getRecentVisitors(100); // Get more visitors for search

  const filteredVisitors = useMemo(() => {
    if (!searchQuery.trim()) {
      return allVisitors.slice(0, 20); // Show first 20 when no search
    }

    const query = searchQuery.toLowerCase().trim();
    return allVisitors.filter(visitor =>
      visitor.name.toLowerCase().includes(query) ||
      (visitor.email && visitor.email.toLowerCase().includes(query)) ||
      visitor.phone.toLowerCase().includes(query)
    );
  }, [allVisitors, searchQuery]);

  if (allVisitors.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>Visitor History</Text>
          <Text style={styles.emptyText}>No visitors recorded yet</Text>
          <Text style={styles.emptySubtext}>
            Visitor entries will appear here once they are submitted
          </Text>
        </View>
      </View>
    );
  }

  const renderVisitor = ({ item, index }: { item: VisitorFormData; index: number }) => (
    <VisitorCard visitor={item} index={index} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Visitor History</Text>
        <Text style={styles.subtitle}>
          {searchQuery ?
            `${filteredVisitors.length} result${filteredVisitors.length === 1 ? '' : 's'} found` :
            `${allVisitors.length} total ${allVisitors.length === 1 ? 'entry' : 'entries'}`
          }
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {filteredVisitors.length === 0 && searchQuery ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No visitors found</Text>
          <Text style={styles.noResultsSubtext}>
            Try searching with a different term
          </Text>
        </View>
      ) : (
        <FlashList
          data={filteredVisitors}
          renderItem={renderVisitor}
          keyExtractor={(item, index) => `${item.timestamp}-${index}`}
          contentContainerStyle={styles.content}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.m,
    paddingTop: theme.spacing.s,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.m,
  },
  searchInput: {
    marginBottom: 0,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  emptyText: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  emptySubtext: {
    ...theme.typography.bodyLarge,
    color: theme.colors.subtleText,
    textAlign: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  noResultsText: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  noResultsSubtext: {
    ...theme.typography.bodyLarge,
    color: theme.colors.subtleText,
    textAlign: 'center',
  },
  visitorCard: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.m,
  },
  visitorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.s,
  },
  visitorInfo: {
    flex: 1,
  },
  visitorName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  visitorDate: {
    ...theme.typography.caption,
    color: theme.colors.subtleText,
  },
  visitorPhoto: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.medium,
    marginLeft: theme.spacing.s,
  },
  visitorDetails: {
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  detailLabel: {
    ...theme.typography.label,
    color: theme.colors.subtleText,
    width: 80,
  },
  detailValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  signatureContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.s,
    marginTop: theme.spacing.s,
  },
  signatureLabel: {
    ...theme.typography.body,
    color: theme.colors.subtleText,
    fontWeight: '500',
    marginBottom: theme.spacing.s,
  },
  signatureImage: {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.small,
  },
});

