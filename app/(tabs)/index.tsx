import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Feather,
  AntDesign
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { wallets, entries } = useSelector((state: RootState) => state.expense);
  const { user } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();

  useEffect(() => {
    dispatch(loadData());
    
    // Vérifier la santé financière périodiquement (toutes les heures)
    const checkHealth = () => {
      dispatch(checkFinancialHealth() as any);
    };
    
    // Vérification immédiate
    setTimeout(checkHealth, 2000);
    
    // Vérification périodique (toutes les heures)
    const interval = setInterval(checkHealth, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [dispatch]);

  // Masquer le solde quand on quitte la page
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(hideBalance());
      };
    }, [dispatch])
  );

  // Calculs mémorisés
  const { totalBalance, monthlyIncome, monthlyExpenses } = useMemo(() => {
    const total = entries.reduce((sum, entry) => {
      return sum + (entry.type === 'income' ? entry.amount : -entry.amount);
    }, 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === currentMonth && 
             entryDate.getFullYear() === currentYear;
    });

    const income = monthlyEntries
      .filter((entry) => entry.type === 'income')
      .reduce((sum, entry) => sum + entry.amount, 0);
    
    const expenses = monthlyEntries
      .filter((entry) => entry.type === 'expense')
      .reduce((sum, entry) => sum + entry.amount, 0);

    return { totalBalance: total, monthlyIncome: income, monthlyExpenses: expenses };
  }, [entries]);

  // Dernières transactions
  const recentTransactions = entries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GlobalHeader />
      
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            Bonjour 👋
          </Text>
          <Text style={[styles.username, { color: colors.text }]}>
            {user?.email?.split('@')[0] || 'Utilisateur'}
          </Text>
        </View>

        {/* Modern Wallet Card */}
        <View style={[styles.walletCard, { backgroundColor: colors.primary }]}>
          <View style={styles.walletHeader}>
            <View style={styles.walletInfo}>
              <View style={[styles.walletIconContainer, { backgroundColor: colors.surface + '20' }]}>
                <WalletIcon size={24} color={colors.surface} />
              </View>
              <View>
                <Text style={[styles.walletLabel, { color: colors.surface + 'CC' }]}>
                  Mon Portefeuille
                </Text>
                <Text style={[styles.walletTitle, { color: colors.surface }]}>
                  Solde Total
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.balanceContainer}>
            <BalanceDisplay 
              balance={totalBalance} 
              size="large"
              showToggle={true}
            />
            <View style={styles.balanceIndicator}>
              <View style={[styles.indicatorDot, { backgroundColor: totalBalance >= 0 ? '#4CAF50' : '#F44336' }]} />
              <Text style={[styles.balanceStatus, { color: colors.surface + 'CC' }]}>
                {totalBalance >= 0 ? 'Positif' : 'Négatif'}
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.addTransactionButton, { backgroundColor: colors.surface }]} 
            onPress={() => router.push('/(tabs)/new-transaction')}
          >
            <AntDesign name="plus" size={18} color={colors.primary} />
            <Text style={[styles.addTransactionText, { color: colors.primary }]}>
              Nouvelle transaction
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.statIconContainer, { backgroundColor: colors.success + '20' }]}>
              <Feather name="arrow-down-left" size={20} color={colors.success} />
            </View>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Revenus ce mois</Text>
            <Text style={[styles.statAmount, { color: colors.success }]}>
              +{monthlyIncome.toLocaleString()} XAF
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.statIconContainer, { backgroundColor: colors.error + '20' }]}>
              <Feather name="arrow-up-right" size={20} color={colors.error} />
            </View>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Dépenses ce mois</Text>
            <Text style={[styles.statAmount, { color: colors.error }]}>
              -{monthlyExpenses.toLocaleString()} XAF
            </Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Transactions récentes</Text>
            <TouchableOpacity onPress={() => router.push('/transactions-history')}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsList}>
            {recentTransactions.length === 0 ? (
              <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
                <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                  Aucune transaction récente
                </Text>
              </View>
            ) : (
              recentTransactions.map((transaction) => {
                const wallet = wallets.find(w => w.id === transaction.walletId);
                return (
                  <TouchableOpacity
                    key={transaction.id}
                    style={[styles.transactionItem, { backgroundColor: colors.surface }]}
                    onPress={() => router.push(`/category-detail?id=${transaction.walletId}`)}
                  >
                    <View style={styles.transactionLeft}>
                      <View style={[
                        styles.transactionIcon,
                        { backgroundColor: wallet?.color ? wallet.color + '20' : colors.primary + '20' }
                      ]}>
                        {transaction.type === 'income' ? (
                          <Feather name="arrow-down-left" size={16} color={wallet?.color || colors.primary} />
                        ) : (
                          <Feather name="arrow-up-right" size={16} color={wallet?.color || colors.primary} />
                        )}
                      </View>
                      <View style={styles.transactionInfo}>
                        <Text style={[styles.transactionTitle, { color: colors.text }]}>
                          {transaction.title}
                        </Text>
                        <Text style={[styles.transactionCategory, { color: colors.textSecondary }]}>
                          {wallet?.name || 'Catégorie inconnue'}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.transactionRight}>
                      <Text style={[
                        styles.transactionAmount,
                        { color: transaction.type === 'income' ? colors.success : colors.error }
                      ]}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {transaction.amount.toLocaleString()} XAF
                      </Text>
                      <Text style={[styles.transactionTime, { color: colors.textSecondary }]}>
                        {formatTime(transaction.date)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions rapides</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.surface }]}
              onPress={() => router.push('/transaction-form')}
            >
              <AntDesign name="plus" size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Ajouter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.surface }]}
              onPress={() => router.push('/(tabs)/my-wallets')}
            >
              <WalletIcon size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Catégories</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.surface }]}
              onPress={() => router.push('/(tabs)/analytics')}
            >
              <StatIcon size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Stats</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  greetingSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  walletCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  walletLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  balanceContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  balanceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  balanceStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  addTransactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  addTransactionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  statAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsList: {
    gap: 12,
  },
  emptyState: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionTime: {
    fontSize: 12,
  },
  quickActions: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    minWidth: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});
