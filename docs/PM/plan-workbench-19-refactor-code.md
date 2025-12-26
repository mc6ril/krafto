---
Generated: 2025-01-23
Ticket: 19
Plan: Refactorisation du code existant
---

# Implementation Plan: Refactorisation du code existant

## Summary

Refactoriser les repositories, la gestion d'erreurs et l'authentification pour éliminer la duplication, standardiser les patterns, optimiser les performances, et gérer correctement le cas d'email de vérification lors du signup. Priorité: décider de l'architecture (factory vs direct), créer les utilitaires partagés, puis refactoriser chaque repository.

**Key Constraints:**

- Conserver la compatibilité avec l'architecture Clean Architecture existante
- Maintenir tous les tests existants (refactoring sans régression)
- Factories nécessaires pour server-side (middleware, layouts), repositories directs pour browser (hooks React Query)
- Email verification: Supabase retourne `session: null` quand email verification est requise (comportement normal, pas une erreur)

## Solution Outline

**Layers Impacted:**

- **Domain**: Étendre `AuthResult` avec flag `requiresEmailVerification`, vérifier cohérence des types d'erreurs
- **Infrastructure**: Créer utilitaires partagés (`handleRepositoryError`, constantes d'erreurs), unifier patterns entre factories/direct, optimiser `addCurrentUserAsMember`
- **Usecases**: Adapter `signUpUser` pour gérer email verification
- **Presentation**: Mettre à jour `SignupPage` pour afficher message de vérification email

## Sub-Tickets

### 19.1 - Architecture Decision: Factory Pattern

- **AC**: [x] Analyser l'utilisation actuelle des factories vs repositories directs [x] Décider de l'approche: garder les deux (factories pour server, directs pour browser) OU unifier [x] Documenter la décision dans un fichier `docs/architecture/repositories.md` [x] Si unifier: décider si on garde uniquement factories (avec `createSupabaseBrowserClient()` par défaut) ou direct (avec factory optionnelle)
- **DoD**: [x] Décision documentée [x] Justification claire de l'approche choisie [x] Impact sur le code existant identifié
- **Effort**: 1h | **Deps**: none
- **Risk**: Décision impacte tous les sous-tickets suivants

### 19.2 - Repository Error Handling Utilities

- **AC**: [x] Créer `handleRepositoryError()` helper dans `src/infrastructure/supabase/shared/errorHandler.ts` [x] Standardiser le pattern try/catch avec vérification de codes d'erreur [x] Extraire les codes d'erreur auth hardcodés en constante `AUTH_ERROR_CODES` dans `src/infrastructure/supabase/auth/authErrorConstants.ts` [x] Utiliser `hasErrorCode` de manière cohérente (remplacer vérifications inline dans ticketRepository)
- **DoD**: [x] Helper `handleRepositoryError` créé et testé [x] Constantes d'erreur extraites et exportées [x] Tests unitaires pour les utilitaires
- **Effort**: 2h | **Deps**: 19.1 (pour savoir où mettre les fichiers)
- **Risk**: Doit être compatible avec tous les repositories existants

### 19.3 - Auth Repository Refactoring (DRY + Email Verification)

- **AC**: [ ] Extraire code commun entre `authRepositorySupabase.ts` et `authRepositorySupabaseFactory.ts` [ ] Modifier `signUp` pour gérer `data.session === null` (cas email verification) [ ] Retourner `AuthResult` avec `requiresEmailVerification: true` au lieu de lancer erreur [ ] Utiliser les nouveaux utilitaires d'erreur (`handleRepositoryError`, `AUTH_ERROR_CODES`)
- **DoD**: [ ] Duplication éliminée entre factory et direct [ ] Email verification géré correctement (pas d'erreur, flag retourné) [ ] Tests existants passent + nouveaux tests pour email verification [ ] Code utilise les utilitaires partagés
- **Effort**: 3h | **Deps**: 19.2 (utilitaires d'erreur)
- **Risk**: Changement de comportement pour email verification (doit être backward compatible côté UI)

### 19.4 - Auth Domain Schema Update (Email Verification)

- **AC**: [ ] Étendre `AuthResult` dans `src/core/domain/auth/auth.schema.ts` avec `requiresEmailVerification?: boolean` [ ] Adapter `signUpUser` usecase pour gérer le nouveau flag [ ] S'assurer que le type est rétro-compatible (optional flag)
- **DoD**: [ ] Type `AuthResult` étendu [ ] Usecase adapté [ ] Tests du usecase mis à jour [ ] Rétro-compatibilité vérifiée
- **Effort**: 1h | **Deps**: 19.3 (repository retourne le flag)
- **Risk**: Changement de type (mais optional, donc safe)

### 19.5 - Auth UI Update (Email Verification Message)

- **AC**: [ ] Mettre à jour `SignupPage` pour détecter `requiresEmailVerification: true` [ ] Afficher message informatif au lieu de rediriger vers signin [ ] Message: "Vérifiez votre email pour finaliser votre inscription" [ ] Adapter `useSignUp` hook si nécessaire
- **DoD**: [ ] UI affiche message approprié [ ] Pas de redirection si email verification requise [ ] Message traduit (i18n) [ ] Tests UI mis à jour
- **Effort**: 2h | **Deps**: 19.4 (usecase retourne le flag)
- **Risk**: Change UX flow (peut nécessiter ajustements)

### 19.6 - Project Repository Refactoring (DRY + Performance)

- **AC**: [ ] Extraire code commun entre `projectRepositorySupabase.ts` et `projectRepositorySupabaseFactory.ts` [ ] Optimiser `addCurrentUserAsMember`: réduire de 3 à 1-2 appels (éliminer `rpc('project_exists')` ou combiner avec insert) [ ] Utiliser les utilitaires d'erreur standardisés [ ] Standardiser `list()` entre factory et direct (actuellement approches différentes)
- **DoD**: [ ] Duplication éliminée [ ] `addCurrentUserAsMember` optimisé (max 2 appels) [ ] Tests passent + tests de performance [ ] Code utilise utilitaires partagés
- **Effort**: 4h | **Deps**: 19.2 (utilitaires d'erreur)
- **Risk**: Optimisation peut casser la logique existante, tests critiques

### 19.7 - Ticket Repository Standardization

- **AC**: [ ] Standardiser gestion d'erreurs dans `ticketRepositorySupabase.ts` [ ] Remplacer vérifications inline de codes d'erreur par `hasErrorCode` [ ] Utiliser `handleRepositoryError` helper [ ] Uniformiser avec patterns des autres repositories
- **DoD**: [ ] Code standardisé (même pattern que projectRepository) [ ] Tests passent [ ] Code utilise utilitaires partagés [ ] Cohérence avec autres repositories
- **Effort**: 1h | **Deps**: 19.2 (utilitaires d'erreur)
- **Risk**: Low (standardisation pure)

### 19.8 - Documentation & Cleanup

- **AC**: [ ] Documenter l'architecture des repositories (si pas fait dans 19.1) [ ] Vérifier qu'il n'y a plus de duplication majeure [ ] Vérifier que tous les repositories suivent les mêmes patterns [ ] Mettre à jour README ou docs si nécessaire
- **DoD**: [ ] Documentation à jour [ ] Code review effectué [ ] Pas de duplication majeure restante [ ] Patterns cohérents partout
- **Effort**: 1h | **Deps**: 19.3, 19.6, 19.7 (tous repositories refactorisés)
- **Risk**: Low

## Unit Test Spec

### File: `src/infrastructure/supabase/utils/errorHandler.test.ts`

**Key Tests:**

- `handleRepositoryError` re-throws domain errors with correct codes
- `handleRepositoryError` wraps unknown errors with mapSupabaseError
- `handleRepositoryError` works with different error code lists

**Status**: tests proposed

### File: `src/infrastructure/supabase/repositories/authRepositorySupabase.test.ts` (update)

**Key Tests:**

- `signUp` returns `requiresEmailVerification: true` when session is null
- `signUp` returns session when email verification not required
- Error handling uses shared utilities correctly

**Status**: tests proposed

### File: `src/core/usecases/auth/signUpUser.test.ts` (update)

**Key Tests:**

- `signUpUser` handles `requiresEmailVerification` flag correctly
- Usecase propagates flag from repository

**Status**: tests proposed

## Agent Prompts

### Unit Test Coach

"Generate unit tests for repository error handling utilities (`handleRepositoryError` function) and update tests for auth repository to cover email verification case where `signUp` returns `requiresEmailVerification: true` when Supabase session is null."

### Architecture-Aware Dev

"Refactor auth and project repositories to eliminate duplication between factory and direct implementations. Extract shared error handling into `handleRepositoryError` utility. Optimize `addCurrentUserAsMember` to reduce database calls from 3 to 1-2. Handle email verification case in `signUp` (return flag instead of throwing error)."

### UI Designer

"Update SignupPage to display informative message when email verification is required (`requiresEmailVerification: true`). Message should be user-friendly, translated, and prevent automatic redirect to signin page."

### QA & Test Coach

"Create test plan for refactored repositories: verify no regression in existing functionality, test email verification flow end-to-end, verify error handling consistency across all repositories, performance test for optimized `addCurrentUserAsMember` method."

## Open Questions

1. **Factory vs Direct**: Doit-on garder les deux approches (factories pour server, direct pour browser) ou unifier? Quelle approche est la plus maintenable à long terme?
2. **Email Verification UX**: Après affichage du message "vérifiez votre email", doit-on rediriger vers signin après X secondes, ou laisser l'utilisateur sur la page signup?
3. **Performance Target**: Pour `addCurrentUserAsMember`, est-ce acceptable de faire 2 appels (getSession + insert avec retour), ou doit-on absolument réduire à 1?

## MVP Cut List

Si besoin de simplifier:

- **Must Have**: 19.2 (utilitaires erreur), 19.3 (auth DRY), 19.6 (project DRY + perf), 19.7 (ticket standardization)
- **Should Have**: 19.4 (email verification domain), 19.5 (email verification UI)
- **Nice to Have**: 19.1 (documentation architecture), 19.8 (cleanup docs)

**Note**: Email verification (19.4, 19.5) peut être reporté si pas critique, mais les refactorings DRY et performance sont essentiels pour la maintenabilité.
