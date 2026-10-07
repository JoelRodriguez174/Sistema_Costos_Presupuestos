import { useState } from 'react';

/**
 * Reusable modal state hook.
 * Extracted from the duplicated open/close/edit/form logic in ProductsPage and VouchersPage.
 *
 * @param {Object} defaultForm - The initial form values when opening for "add"
 * @returns {{ isOpen, editingItem, form, setForm, openForAdd, openForEdit, close }}
 */
export default function useModal(defaultForm) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(defaultForm);

  const openForAdd = (overrideForm) => {
    setEditingItem(null);
    setForm(overrideForm || defaultForm);
    setIsOpen(true);
  };

  const openForEdit = (item, formMapper) => {
    setEditingItem(item);
    setForm(formMapper(item));
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return { isOpen, editingItem, form, setForm, openForAdd, openForEdit, close };
}
