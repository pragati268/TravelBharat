import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Tags,
  X,
  Upload,
} from "lucide-react";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/admin/DeleteModal";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/adminCategoryService";

const defaultForm = {
  name: "",
  slug: "",
  description: "",
  icon: "",
  featured: false,
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [coverFile, setCoverFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openCreate = () => {
    setEditing(null);
    setForm(defaultForm);
    setCoverFile(null);
    setPreview(null);
    setModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({
      name: cat.name || "",
      slug: cat.slug || "",
      description: cat.description || "",
      icon: cat.icon || "",
      featured: cat.featured || false,
    });
    setCoverFile(null);
    setPreview(cat.coverImage || null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        fd.append(key, val);
      });
      if (coverFile) fd.append("coverImage", coverFile);

      if (editing) {
        await updateCategory(editing._id, fd);
        toast.success("Category updated successfully");
      } else {
        await createCategory(fd);
        toast.success("Category created successfully");
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await deleteCategory(deleteId);
      toast.success("Category deleted successfully");
      setDeleteId(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete category");
    } finally {
      setDeleteLoading(false);
    }
  };

  const toggleFeatured = async (cat) => {
    try {
      const fd = new FormData();
      fd.append("featured", !cat.featured);
      await updateCategory(cat._id, fd);
      toast.success(cat.featured ? "Removed from featured" : "Added to featured");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to toggle featured");
    }
  };

  const columns = [
    {
      key: "image",
      label: "Icon",
      width: "60px",
      render: (row) =>
        row.coverImage ? (
          <img
            src={row.coverImage}
            alt={row.name}
            className="h-10 w-10 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
            <Tags size={16} />
          </div>
        ),
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: "description",
      label: "Description",
      render: (row) => (
        <span className="text-muted line-clamp-1">{row.description || "-"}</span>
      ),
    },
    {
      key: "icon",
      label: "Icon Name",
      render: (row) =>
        row.icon ? (
          <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs text-muted">
            {row.icon}
          </span>
        ) : (
          "-"
        ),
    },
    {
      key: "featured",
      label: "Featured",
      width: "100px",
      render: (row) => (
        <button
          onClick={() => toggleFeatured(row)}
          className={`rounded-lg p-1.5 transition-all duration-200 ${
            row.featured
              ? "text-accent bg-accent/10 hover:bg-accent/20"
              : "text-gray-300 hover:text-gray-400 hover:bg-gray-100"
          }`}
          title={row.featured ? "Remove from featured" : "Add to featured"}
        >
          <Star size={16} fill={row.featured ? "currentColor" : "none"} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-dark lg:hidden">
            Categories Management
          </h2>
          <p className="font-body text-sm text-muted mt-0.5">
            Manage travel categories and classifications
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-5 py-2.5 font-body text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-primary-light hover:to-primary hover:shadow-lg active:scale-[0.97]"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span className="hidden sm:inline">Add Category</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        loading={loading}
        error={error}
        onRetry={fetchCategories}
        searchPlaceholder="Search categories..."
        searchKeys={["name", "description"]}
        renderActions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => openEdit(row)}
              className="rounded-lg p-2 text-muted hover:bg-primary/5 hover:text-primary transition-colors"
              title="Edit"
            >
              <Pencil size={15} strokeWidth={1.8} />
            </button>
            <button
              onClick={() => setDeleteId(row._id)}
              className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={15} strokeWidth={1.8} />
            </button>
          </div>
        )}
      />

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl border border-gray-100 bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 rounded-t-2xl">
                <h3 className="font-heading text-lg font-bold text-dark">
                  {editing ? "Edit Category" : "Add New Category"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg p-1.5 text-dark/40 hover:bg-gray-100 hover:text-dark/60 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block font-body text-sm font-medium text-dark">
                      Category Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 font-body text-sm text-dark outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                      placeholder="e.g., Heritage"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block font-body text-sm font-medium text-dark">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 font-body text-sm text-dark outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                      placeholder="e.g., heritage"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block font-body text-sm font-medium text-dark">
                      Icon Name
                    </label>
                    <input
                      type="text"
                      value={form.icon}
                      onChange={(e) => setForm({ ...form, icon: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 font-body text-sm text-dark outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                      placeholder="e.g., Landmark"
                    />
                    <p className="mt-1 font-body text-xs text-muted">
                      Lucide icon name (e.g., Landmark, Temple, Mountain)
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block font-body text-sm font-medium text-dark">
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      rows={3}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 font-body text-sm text-dark outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/10 resize-none"
                      placeholder="Describe the category..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block font-body text-sm font-medium text-dark">
                      Cover Image
                    </label>
                    <div className="flex items-start gap-4">
                      <label className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 px-4 py-3 text-sm text-muted transition-colors hover:border-primary/30 hover:text-primary">
                        <Upload size={18} />
                        <span>{coverFile ? coverFile.name : "Choose image"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setCoverFile(file);
                              setPreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </label>
                      {preview && (
                        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={preview}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setCoverFile(null);
                              setPreview(null);
                            }}
                            className="absolute top-1 right-1 rounded-full bg-black/50 p-0.5 text-white"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:col-span-2">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) =>
                          setForm({ ...form, featured: e.target.checked })
                        }
                        className="peer sr-only"
                      />
                      <div className="h-6 w-11 rounded-full border border-gray-200 bg-gray-100 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-200 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                    </label>
                    <span className="font-body text-sm font-medium text-dark">
                      Featured Category
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 font-body text-sm font-medium text-dark transition-all hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-gradient-to-r from-primary to-primary-light px-6 py-2.5 font-body text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-primary-light hover:to-primary hover:shadow-lg disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editing ? "Update Category" : "Create Category"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this category? Tourist places in this category may be affected."
        loading={deleteLoading}
      />
    </div>
  );
};

export default Categories;
