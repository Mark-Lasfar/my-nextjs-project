'use server'

import { cache } from 'react'
import { ISettingInput } from '@/types'
import data from '../data'
import Setting from '../db/models/setting.model'
import { connectToDatabase } from '../db'
import { formatError } from '../utils'
import { cookies } from 'next/headers'

// Type for responses
interface SettingResponse<T = void> {
  success: boolean
  message: string
  data?: T
}

// Global cache for settings
declare global {
  // eslint-disable-next-line no-var
  var cachedSettings: ISettingInput | null | undefined
}
const globalForSettings = global as { cachedSettings: ISettingInput | null | undefined }
globalForSettings.cachedSettings = globalForSettings.cachedSettings || null

// Default settings object
const DEFAULT_SETTINGS: ISettingInput = {
  site: {
    name: 'MGZon',
    slogan: 'Your Ultimate Shopping Destination',
    description: 'Shop online for the best products at great prices',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://hager-zon.vercel.app',
    email: 'support@mgzon.com',
    address: '123 Main St',
    phone: '+1234567890',
    logo: '/logo.png',
    keywords: 'ecommerce, shopping',
    author: 'MGZon Team',
    copyright: '© 2024 MGZon',
  },
  common: {
    pageSize: 9,
    isMaintenanceMode: false,
    freeShippingMinPrice: 0,
    defaultTheme: 'light',
    defaultColor: 'gold',
  },
  availableLanguages: [
    {
      name: 'English',
      code: 'en-US',
    },
  ],
  carousels: [],
  defaultLanguage: 'en-US',
  availableCurrencies: [
    {
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      convertRate: 1,
    },
  ],
  defaultCurrency: 'USD',
  availablePaymentMethods: [
    {
      name: 'Credit Card',
      commission: 0,
    },
  ],
  defaultPaymentMethod: 'Credit Card',
  availableDeliveryDates: [
    {
      name: 'Standard Shipping',
      daysToDeliver: 3,
      shippingPrice: 0,
      freeShippingMinPrice: 50,
    },
  ],
  defaultDeliveryDate: 'Standard Shipping',
}

/**
 * Ensures settings are not null and have proper defaults
 */
function ensureSettings(settings: ISettingInput | null | undefined): ISettingInput {
  if (!settings) {
    return { ...DEFAULT_SETTINGS }
  }
  return settings
}

/**
 * Get settings without cache
 */
export async function getNoCachedSetting(): Promise<ISettingInput> {
  try {
    await connectToDatabase()
    const setting = await Setting.findOne().lean()
    return setting
      ? JSON.parse(JSON.stringify(setting))
      : { ...DEFAULT_SETTINGS }
  } catch (error) {
    console.error('Error fetching uncached settings:', error)
    return { ...DEFAULT_SETTINGS }
  }
}

/**
 * Get settings with cache (React cache)
 */
export const getSetting = cache(async (): Promise<ISettingInput> => {
  try {
    if (globalForSettings.cachedSettings) {
      return ensureSettings(
        JSON.parse(JSON.stringify(globalForSettings.cachedSettings))
      )
    }

    await connectToDatabase()
    const setting = await Setting.findOne().lean()

    const settingsToCache = setting
      ? JSON.parse(JSON.stringify(setting))
      : data.settings?.[0] || { ...DEFAULT_SETTINGS }

    globalForSettings.cachedSettings = settingsToCache

    return ensureSettings(settingsToCache)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return { ...DEFAULT_SETTINGS }
  }
})

/**
 * Update settings
 */
export async function updateSetting(
  newSetting: ISettingInput
): Promise<SettingResponse<ISettingInput>> {
  try {
    await connectToDatabase()
    const updatedSetting = await Setting.findOneAndUpdate({}, newSetting, {
      upsert: true,
      new: true,
      lean: true,
    })

    if (!updatedSetting) {
      throw new Error('Failed to update settings')
    }

    const parsedSetting = JSON.parse(JSON.stringify(updatedSetting))
    globalForSettings.cachedSettings = parsedSetting

    return {
      success: true,
      message: 'Setting updated successfully',
      data: parsedSetting,
    }
  } catch (error) {
    console.error('Error updating settings:', error)
    return {
      success: false,
      message: formatError(error),
    }
  }
}

/**
 * Update currency in cookies
 */
export async function setCurrencyOnServer(
  newCurrency: string
): Promise<SettingResponse> {
  try {
    const cookieStore = await cookies()
    cookieStore.set('currency', newCurrency, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    return {
      success: true,
      message: 'Currency updated successfully',
    }
  } catch (error) {
    console.error('Error setting currency:', error)
    return {
      success: false,
      message: formatError(error),
    }
  }
}

/**
 * Clear settings cache
 */
export async function clearSettingsCache(): Promise<SettingResponse> {
  globalForSettings.cachedSettings = null
  return { success: true, message: 'Cache cleared successfully' }
}

/**
 * Get settings with optional cache bypass
 */
export async function getSettingWithOptions(
  options: { bypassCache?: boolean } = {}
): Promise<ISettingInput> {
  const settings = options.bypassCache
    ? await getNoCachedSetting()
    : await getSetting()
  return ensureSettings(settings)
}

// Current Date and Time (UTC): 2025-04-21 04:41:03
// Current User's Login: ibrahim-lasfar