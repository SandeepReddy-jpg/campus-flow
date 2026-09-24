import { useEffect, useState } from 'react';

export interface ShortcutHandlers {
  onOpenSearch?: () => void;
  onCloseModal?: () => void;
  onSelectRoleNumber?: (roleIndex: number) => void;
}

/**
 * Custom hook to register global keyboard shortcuts:
 * - 'Ctrl+K' / 'Cmd+K' : Triggers global search / command palette
 * - 'Escape' : Closes any active modal or exits full-screen view
 * - 'Alt+1' through 'Alt+4' : Fast screen switching (power user bonus)
 */
export function useKeyboardShortcuts({
  onOpenSearch,
  onCloseModal,
  onSelectRoleNumber,
}: ShortcutHandlers) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Detect if client is running macOS for displaying Cmd vs Ctrl
    if (typeof window !== 'undefined' && navigator?.platform) {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifierPressed = event.ctrlKey || event.metaKey;

      // 1. Global Search Trigger: Ctrl+K or Cmd+K
      if (isModifierPressed && (event.key === 'k' || event.key === 'K')) {
        event.preventDefault();
        event.stopPropagation();
        onOpenSearch?.();
        return;
      }

      // 2. Escape: Close any open modal / view
      if (event.key === 'Escape') {
        onCloseModal?.();
        return;
      }

      // 3. Quick Screen Switching: Alt + 1/2/3/4 or Ctrl + 1/2/3/4 (if not in input)
      if (
        event.altKey &&
        ['1', '2', '3', '4'].includes(event.key) &&
        !['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement)?.tagName)
      ) {
        event.preventDefault();
        const roleIndex = parseInt(event.key, 10);
        onSelectRoleNumber?.(roleIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [onOpenSearch, onCloseModal, onSelectRoleNumber]);

  return {
    modifierKey: isMac ? '⌘' : 'Ctrl',
    searchShortcutText: isMac ? '⌘K' : 'Ctrl+K',
  };
}
