"use client";

import { useContext } from "react";

import { RuleContext } from "@/providers/journal/RuleProvider";

export function useRule() {
    const context =
        useContext(RuleContext);

    if (!context) {
        throw new Error(
            "useRule must be used inside RuleProvider"
        );
    }

    return context;
}