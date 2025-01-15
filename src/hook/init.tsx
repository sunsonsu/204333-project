'use client';

import { DefaultProp } from '@/interface/page';
import React from 'react'

export default function InitHook(prop:DefaultProp) {
  return (<>
    {prop.children}
  </>)
}
