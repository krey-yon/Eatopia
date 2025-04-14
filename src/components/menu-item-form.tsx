"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addMenuItems } from "@/app/dashboard/restaurant/action"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {MenuItemFormSchema} from "@/lib/definitions";
import {useMutationData} from "@/hooks/useMutationData";
import { useAddMenuItem } from "@/hooks/useAddMenuItem"
import FormGenerator from "./form-generator"
// import { addMenuItem } from "@/lib/menu"

export function MenuItemForm({ menuId }: { menuId: string }) {

  const { errors, onFormSubmit, register } = useAddMenuItem()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Menu Item</CardTitle>
        <CardDescription>Add a new item to your restaurant menu</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <form onSubmit={onFormSubmit} className="space-y-4"> */}
        <form onSubmit={onFormSubmit} className={"flex flex-col gap-y-2"}>
            <FormGenerator
              inputType={"input"}
              register={register}
              name={"name"}
              errors={errors}
              placeholder={"name"}
              type={"text"}
              label={"name"}
            />
            <FormGenerator
              inputType={"input"}
              register={register}
              name={"price"}
              errors={errors}
              placeholder={"price"}
              type={"text"}
              label={"price"}
            />
            <FormGenerator
              inputType={"input"}
              register={register}
              name={"imageUrl"}
              errors={errors}
              placeholder={"imageUrl"}
              type={"text"}
              label={"imageUrl"}
            />
          <Button type="submit" className="w-full">
            {/* {loading ? "Adding..." : "Add Menu Item"} */}
            Add Menu Item
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
