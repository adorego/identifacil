import ReactDOM from 'react-dom'
import { redirect } from 'next/navigation'
import styles from './page.module.css'
import { useEffect } from 'react'

export default function Home() {
  redirect('/login');
}
