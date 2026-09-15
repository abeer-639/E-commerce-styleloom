"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, PlusCircle, Pencil, Save, X } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useI18n } from "@/i18n/I18nContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {addProduct, updateProduct, removeProduct} from "@/store/slices/productsSlice";
import { removeFromCart } from "@/store/slices/cartSlice";
import { getProductContent } from "@/lib/productContent";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/data/types";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { SuccessToast } from "@/components/ui/SuccessToast";

const CATEGORIES: Product["category"][] = [
  "womenswear",
  "menswear",
  "kidswear",
  "accessories",
];

const AUDIENCES: Product["audience"][] = ["mens", "womens", "kids"];

const selectClass =
  "w-full rounded-xl2 border border-dashed border-base-600 bg-base-800 px-4 py-2.5 text-sm text-ink-100 focus:border-brand focus:outline-none";

function ProductForm({
  editingProduct,
  onDoneEditing,
}: {
  editingProduct: Product | null;
  onDoneEditing: () => void;
}) {
  const { t, locale } = useI18n();
  const dispatch = useAppDispatch();

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");

  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  const [price, setPrice] = useState("");
  const [category, setCategory] =
    useState<Product["category"]>(CATEGORIES[0]);
  const [audience, setAudience] =
    useState<Product["audience"]>(AUDIENCES[0]);

  const [fitAr, setFitAr] = useState("");
  const [fitEn, setFitEn] = useState("");

  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("4.5");
  const [image, setImage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!editingProduct) {
      setNameAr("");
      setNameEn("");
      setDescriptionAr("");
      setDescriptionEn("");
      setPrice("");
      setCategory(CATEGORIES[0]);
      setAudience(AUDIENCES[0]);
      setFitAr("");
      setFitEn("");
      setStock("");
      setRating("4.5");
      setImage("");
      return;
    }

    const content = getProductContent(t, editingProduct, locale);

    setNameAr(editingProduct.name?.ar ?? "");
    setNameEn(editingProduct.name?.en ?? "");

    setDescriptionAr(editingProduct.description?.ar ?? "");
    setDescriptionEn(editingProduct.description?.en ?? "");

    setPrice(String(editingProduct.price));
    setCategory(editingProduct.category);
    setAudience(editingProduct.audience);

    setFitAr(editingProduct.fit?.ar ?? "");
    setFitEn(editingProduct.fit?.en ?? "");

    setStock(String(editingProduct.stock));
    setRating(String(editingProduct.rating));
    setImage(editingProduct.image);


    if (!editingProduct.name) {
      if (locale === "ar") {
        setNameAr(content.name);
      } else {
        setNameEn(content.name);
      }
    }

    if (!editingProduct.description) {
      if (locale === "ar") {
        setDescriptionAr(content.desc);
      } else {
        setDescriptionEn(content.desc);
      }
    }

    if (!editingProduct.fit) {
      if (locale === "ar") {
        setFitAr(content.fit);
      } else {
        setFitEn(content.fit);
      }
    }
  }, [editingProduct, t, locale]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !nameAr.trim() ||
      !nameEn.trim() ||
      !image.trim()
    ) {
      return;
    }

    const id = editingProduct?.id ?? `admin-${Date.now()}`;

    const product: Product = {
      id,
      nameKey: id,
      descriptionKey: id,

      name: {
        ar: nameAr.trim(),
        en: nameEn.trim(),
      },

      description: {
        ar: descriptionAr.trim(),
        en: descriptionEn.trim(),
      },

      price: Number(price) || 0,
      image: image.trim(),
      category,
      audience,

      fit: {
        ar: fitAr.trim() || "-",
        en: fitEn.trim() || "-",
      },

      stock: Number(stock) || 0,
      rating: Math.min(
        5,
        Math.max(0, Number(rating) || 0)
      ),
    };

    if (editingProduct) {
      dispatch(updateProduct(product));
      onDoneEditing();
    } else {
      dispatch(addProduct(product));

      setNameAr("");
      setNameEn("");
      setDescriptionAr("");
      setDescriptionEn("");
      setPrice("");
      setCategory(CATEGORIES[0]);
      setAudience(AUDIENCES[0]);
      setFitAr("");
      setFitEn("");
      setStock("");
      setRating("4.5");
      setImage("");
      setShowSuccess(true); 
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-[20px] border-2 border-dashed border-base-700 p-6 sm:p-8"
    >
      <h2 className="font-display text-lg font-medium text-ink-100">
        {editingProduct
          ? t.dashboard.editProductHeading
          : t.dashboard.addProductHeading}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Name (English)"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          required
        />

        <Input
          label="الاسم بالعربي"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          required
        />

        <div className="sm:col-span-2">
          <Input
            label="Description (English)"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="الوصف بالعربي"
            value={descriptionAr}
            onChange={(e) => setDescriptionAr(e.target.value)}
          />
        </div>

        <Input
          label={t.dashboard.price}
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink-300">
            {t.dashboard.category}
          </label>

          <select
            className={selectClass}
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as Product["category"]
              )
            }
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {t.products.categories[c]}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Fit (English)"
          value={fitEn}
          onChange={(e) => setFitEn(e.target.value)}
        />

        <Input
          label="المقاس بالعربي"
          value={fitAr}
          onChange={(e) => setFitAr(e.target.value)}
        />

        <Input
          label={t.dashboard.stock}
          type="number"
          min="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <Input
          label={t.dashboard.rating}
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <Input
          label={t.dashboard.image}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="/products/fashion/new-item.jpg"
          required
        />
      </div>

      <p className="text-xs text-ink-500">
        {t.dashboard.imageHint}
      </p>

      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          type="submit"
          className="w-fit"
        >
          {editingProduct ? (
            <Save size={16} />
          ) : (
            <PlusCircle size={16} />
          )}

          {editingProduct
            ? t.dashboard.saveChanges
            : t.dashboard.submit}
        </Button>

        {editingProduct && (
          <Button
            variant="secondary"
            type="button"
            className="w-fit"
            onClick={onDoneEditing}
          >
            <X size={16} />
            {t.dashboard.cancel}
          </Button>
        )}
      </div>
    </form>
    <SuccessToast
      show={showSuccess}
      message={t.dashboard.addSuccessMessage}
      onDismiss={() => setShowSuccess(false)}
    />
    
    </>
  );
}

function ExistingProducts({
  editingId,
  onEdit,
}: {
  editingId: string | null;
  onEdit: (product: Product) => void;
}) {
  const { t, locale } = useI18n();
  const dispatch = useAppDispatch();

  const products = useAppSelector(
    (s) => s.products.items
  );

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      dispatch(removeProduct(pendingDeleteId));
      dispatch(removeFromCart(pendingDeleteId));
    }
    setPendingDeleteId(null);
  };

  return (
    <div className="flex flex-col gap-4 rounded-[20px] border-2 border-dashed border-base-700 p-6 sm:p-8">
      <h2 className="font-display text-lg font-medium text-ink-100">
        {t.dashboard.existingHeading}
      </h2>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title={t.dashboard.delete}
        message={t.dashboard.deleteConfirm}
        confirmLabel={t.dashboard.delete}
        cancelLabel={t.dashboard.cancel}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />

      <div className="flex flex-col gap-3">
        {products.map((product) => {
          const content = getProductContent(
            t,
            product,
            locale
          );

          return (
            <div
              key={product.id}
              className={[
                "flex items-center gap-4 rounded-[12px] border border-dashed p-3",
                product.id === editingId
                  ? "border-brand bg-base-800"
                  : "border-base-700 bg-base-900",
              ].join(" ")}
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[10px] bg-base-800">
                <Image
                  src={product.image}
                  alt={content.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-100">
                  {content.name}
                </p>

                <p className="text-xs text-ink-500">
                  {formatPrice(
                    product.price,
                    t.common.currency
                  )}{" "}
                  · {t.dashboard.stock}: {product.stock}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onEdit(product)}
                className="shrink-0 text-ink-500 transition-colors hover:text-brand"
                aria-label={t.dashboard.edit}
              >
                <Pencil size={18} />
              </button>

              <button
                type="button"
                onClick={() =>
                  setPendingDeleteId(product.id)
                }
                className="shrink-0 text-ink-500 transition-colors hover:text-accent-coral"
                aria-label={t.dashboard.delete}
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DashboardContent() {
  const { t } = useI18n();

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink-100 sm:text-3xl">
          {t.dashboard.title}
        </h1>

        <p className="mt-1 text-ink-500">
          {t.dashboard.subtitle}
        </p>
      </div>

      <ProductForm
        editingProduct={editingProduct}
        onDoneEditing={() =>
          setEditingProduct(null)
        }
      />

      <ExistingProducts
        editingId={editingProduct?.id ?? null}
        onEdit={setEditingProduct}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    
    <ProtectedRoute requireRole="admin">
      <DashboardContent />
    </ProtectedRoute>
  );
}