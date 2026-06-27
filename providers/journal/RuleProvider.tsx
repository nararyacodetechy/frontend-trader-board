"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { defaultRuleCategories } from "@/data/journal/rule/ruleData";
import {
  RuleCategory,
  RuleField,
} from "@/types/journal/rule-types";

type RuleContextType = {
  categories: RuleCategory[];

  openCategory: string | null;
  setOpenCategory: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  updateField: (
    categoryId: string,
    fieldId: string,
    value: boolean
  ) => void;

  readiness: number;
  canExecute: boolean;

  requiredFields: RuleField[];
  optionalFields: RuleField[];

  completedRequiredFields: number;
  completedOptionalFields: number;

  isFieldCompleted: (
    field: RuleField
  ) => boolean;

  renameCategory: (
    categoryId: string,
    name: string
  ) => void;

  addCategory: () => void;

  deleteCategory: (
    categoryId: string
  ) => void;

  renameRule: (
    categoryId: string,
    fieldId: string,
    label: string
  ) => void;

  toggleRequired: (
    categoryId: string,
    fieldId: string
  ) => void;

  changeRuleType: (
    categoryId: string,
    fieldId: string,
    type: RuleField["type"]
  ) => void;

  addRule: (
    categoryId: string
  ) => void;

  deleteRule: (
    categoryId: string,
    fieldId: string
  ) => void;
};

export const RuleContext =
  createContext<RuleContextType | null>(
    null
  );

export function RuleProvider({
  children,
}: {
  children: React.ReactNode;
}) {

    // SELURUH isi useRule pindah ke sini
    const [categories, setCategories] =
        useState<RuleCategory[]>(defaultRuleCategories);

    const [openCategory, setOpenCategory] =
        useState<string | null>(
        defaultRuleCategories[0]?.id ?? null
        );

    const isFieldCompleted = (
        field: RuleField
    ) => field.value === true;

    const allFields = useMemo(
        () => categories.flatMap((category) => category.fields),
        [categories]
    );

    const requiredFields = useMemo(
        () =>
        allFields.filter(
            (field) => field.required
        ),
        [allFields]
    );

    const optionalFields = useMemo(
        () =>
        allFields.filter(
            (field) => !field.required
        ),
        [allFields]
    );

    const completedRequiredFields =
        useMemo(
        () =>
            requiredFields.filter(
            isFieldCompleted
            ).length,
        [requiredFields]
        );

    const completedOptionalFields =
        useMemo(
        () =>
            optionalFields.filter(
            isFieldCompleted
            ).length,
        [optionalFields]
        );

    const readiness = useMemo(() => {
        if (requiredFields.length === 0)
        return 100;

        return Math.round(
        (completedRequiredFields /
            requiredFields.length) *
            100
        );
    }, [
        completedRequiredFields,
        requiredFields,
    ]);

    const canExecute =
        completedRequiredFields ===
        requiredFields.length;

    const updateField = (
        categoryId: string,
        fieldId: string,
        value: boolean
    ) => {
        setCategories((prev) =>
        prev.map((category) =>
            category.id !== categoryId
            ? category
            : {
                ...category,
                fields:
                    category.fields.map(
                    (field) =>
                        field.id !== fieldId
                        ? field
                        : {
                            ...field,
                            value,
                            }
                    ),
                }
        )
        );
    };

    const renameCategory = (
        categoryId: string,
        name: string
      ) => {
        setCategories((prev) =>
          prev.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  name,
                }
              : category
          )
        );
    };

    const addCategory = () => {
        setCategories((prev) => [
          ...prev,
          {
            id: `cat-${Date.now()}`,
            name: "New Category",
            fields: [],
          },
        ]);
    };

    const deleteCategory = (
        categoryId: string
        ) => {
        setCategories((prev) =>
            prev.filter(
            (category) =>
                category.id !== categoryId
            )
        );
    };

    const renameRule = (
        categoryId: string,
        fieldId: string,
        label: string
      ) => {
        setCategories((prev) =>
          prev.map((category) =>
            category.id !== categoryId
              ? category
              : {
                  ...category,
                  fields: category.fields.map(
                    (field) =>
                      field.id !== fieldId
                        ? field
                        : {
                            ...field,
                            label,
                          }
                  ),
                }
          )
        );
    };

    const toggleRequired = (
        categoryId: string,
        fieldId: string
      ) => {
        setCategories((prev) =>
          prev.map((category) =>
            category.id !== categoryId
              ? category
              : {
                  ...category,
                  fields: category.fields.map(
                    (field) =>
                      field.id !== fieldId
                        ? field
                        : {
                            ...field,
                            required:
                              !field.required,
                          }
                  ),
                }
          )
        );
    };

    const changeRuleType = (
        categoryId: string,
        fieldId: string,
        type: RuleField["type"]
      ) => {
        setCategories((prev) =>
          prev.map((category) =>
            category.id !== categoryId
              ? category
              : {
                  ...category,
                  fields: category.fields.map(
                    (field) =>
                      field.id !== fieldId
                        ? field
                        : {
                            ...field,
                            type,
                            value:
                              type ===
                              "checkbox"
                                ? false
                                : type ===
                                  "number"
                                ? 0
                                : "",
                          }
                  ),
                }
          )
        );
    };

    const addRule = (
        categoryId: string
      ) => {
        setCategories((prev) =>
          prev.map((category) =>
            category.id !== categoryId
              ? category
              : {
                  ...category,
                  fields: [
                    ...category.fields,
                    {
                      id: `field-${Date.now()}`,
                      label: "",
                      required: true,
                      value: false,
                      type: "checkbox",
                    },
                  ],
                }
          )
        );
    };

    const deleteRule = (
        categoryId: string,
        fieldId: string
      ) => {
        setCategories((prev) =>
          prev.map((category) =>
            category.id !== categoryId
              ? category
              : {
                  ...category,
                  fields:
                    category.fields.filter(
                      (field) =>
                        field.id !== fieldId
                    ),
                }
          )
        );
      };

    return (
      <RuleContext.Provider
        value={{
          categories,
    
          openCategory,
          setOpenCategory,
    
          readiness,
          canExecute,
    
          requiredFields,
          optionalFields,
    
          completedRequiredFields,
          completedOptionalFields,
    
          isFieldCompleted,
    
          updateField,
    
          renameCategory,
          addCategory,
          deleteCategory,
    
          renameRule,
          addRule,
          deleteRule,
    
          toggleRequired,
          changeRuleType,
        }}
      >
        {children}
      </RuleContext.Provider>
    );
}