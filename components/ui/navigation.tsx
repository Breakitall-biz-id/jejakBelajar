"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { DummyAuth, User } from '@/lib/dummy-auth'
import {
  LayoutDashboard,
  BarChart3,
  BookOpen,
  FileText,
  Settings,
  GraduationCap,
  Users,
  Calendar,
  ChevronDown,
  ChevronRight,
  Plus,
  X,
  Eye,
  Star,
  Folder,
  FolderOpen,
  File,
  User as UserIcon,
  Share2,
  Clock,
  Archive,
  FileStack,
} from 'lucide-react'

const favoriteItems = [
  { name: 'Figma Basic', color: 'bg-cyan-500', shared: true },
  { name: 'Folder NEW 2024', color: 'bg-teal-500', shared: false },
  { name: 'Assignment 101', color: 'bg-indigo-500', shared: false },
  { name: 'Quiz Figma', color: 'bg-yellow-500', shared: false }
]

const projectItems = [
  { name: 'Figma basic', color: 'bg-indigo-500', shared: true },
  { name: 'Fikri studio', color: 'bg-pink-500', shared: false }
]

interface NavItemProps {
  item: any
  isActive: boolean
  isMobile?: boolean
  onClick?: () => void
}

function NavItem({ item, isActive, isMobile = false, onClick }: NavItemProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`
        flex items-center px-3 py-2 text-sm font-medium rounded-md transition
        ${isActive
          ? 'bg-white text-blue-600 font-semibold'
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }
      `}
    >
      <item.icon className="w-5 h-5 mr-3" />
      <span className="flex-1">{item.name}</span>
    </Link>
  )
}

interface NavigationProps {
  isMobileOpen: boolean
  onMobileClose: () => void
}

export default function Navigation({ isMobileOpen, onMobileClose }: NavigationProps) {
  // Log user info setiap kali user berubah
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = React.useState<User | null>(null)
  const [favoritesExpanded, setFavoritesExpanded] = useState(true)
  const [projectsExpanded, setProjectsExpanded] = useState(true)

  // Log user info setiap kali user berubah
  React.useEffect(() => {
    if (user) {
      console.log('NAVBAR USER:', user)
    }
  }, [user])

  React.useEffect(() => {
    if (user) {
      console.log('NAVBAR USER:', user)
    }
  }, [user])

  // Ambil user secara sinkron di render agar menu langsung berubah
  let isGuruEmail = false
  if (typeof window !== 'undefined') {
    const email = localStorage.getItem('email')
    if (email === 'guru@jejakbelajar.id') isGuruEmail = true
  }
  // Fallback: jika user state sudah ada
  if (user?.email === 'guru@jejakbelajar.id') isGuruEmail = true
  // Fallback: jika sedang di halaman guru
  if (pathname.startsWith('/dashboard/teacher')) isGuruEmail = true

  React.useEffect(() => {
    const getUser = async () => {
      const currentUser = await DummyAuth.getUser()
      setUser(currentUser)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await DummyAuth.signOut()
    router.push('/auth/login')
  }

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      onMobileClose()
    }
  }

  const adminNavigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Guru', href: '/dashboard/teachers', icon: Users },
    { name: 'Siswa', href: '/dashboard/students', icon: GraduationCap },
    { name: 'Kelas', href: '/dashboard/classes', icon: BookOpen },
    { name: 'Proyek P5', href: '/dashboard/projects', icon: FileText },
    { name: 'Tahun Ajaran', href: '/dashboard/academic-years', icon: Calendar },
    { name: 'Laporan', href: '/dashboard/reports', icon: BarChart3 }
  ]

  const teacherNavigationItems = [
    { name: 'Dashboard Guru', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Siswa', href: '/dashboard/teacher/students', icon: Users },
    { name: 'Umpan Balik & Komentar', href: '/dashboard/teacher/students', icon: BookOpen },
    { name: 'Laporan Individu & Kelas', href: '/dashboard/teacher/reports', icon: BarChart3 },
    { name: 'Pengaturan Projek', href: '/dashboard/teacher/projects', icon: FileText },
    { name: 'Rubrik Penskoran', href: '/dashboard/teacher/projects', icon: FileText },
    { name: 'Observasi Siswa', href: '/dashboard/teacher/observations', icon: Eye },
    { name: 'Jurnal Refleksi', href: '/dashboard/teacher/observations', icon: File },
    // Tambahan menu jika ingin fitur lain, bisa ditambah di sini
  ]

  const getGuruEmail = () => {
    if (typeof window !== 'undefined') {
      // Cek localStorage jika ada
      const email = localStorage.getItem('email')
      if (email === 'guru@jejakbelajar.id') return true
    }
    // Cek user state
    if (user?.email === 'guru@jejakbelajar.id') return true
    return false
  }

  const currentNavigationItems = isGuruEmail ? teacherNavigationItems : adminNavigationItems

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-50 border-r border-gray-100
        transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col h-full
      `}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 bg-gray-50">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-base">
            <UserIcon className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold text-blue-600">
            {isGuruEmail ? 'Teacher Dashboard' : 'JejakBelajar'}
          </span>
          <button
            onClick={onMobileClose}
            className="md:hidden ml-auto p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            {currentNavigationItems.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={pathname === item.href}
                onClick={handleNavClick}
              />
            ))}
          </div>

          {/* Quick Access */}
          <div className="mt-4 flex flex-col gap-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Recents</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition">
              <Users className="w-4 h-4" />
              <span className="text-sm">Shared Content</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition">
              <Archive className="w-4 h-4" />
              <span className="text-sm">Archived</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition">
              <FileStack className="w-4 h-4" />
              <span className="text-sm">Templates</span>
            </div>
          </div>

          {/* Favorites */}
          {!isGuruEmail && (
            <div className="mt-4">
              <button
                onClick={() => setFavoritesExpanded(!favoritesExpanded)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition"
              >
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Favorites
                  <span className="ml-2 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                    {favoriteItems.length}
                  </span>
                </span>
                {favoritesExpanded ? (
                  <ChevronDown className="w-4 h-4 text-blue-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                )}
              </button>
              {favoritesExpanded && (
                <div className="mt-1 flex flex-col gap-1 ml-4">
                  {favoriteItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition">
                      <FolderOpen className={`w-4 h-4 ${item.color} bg-opacity-20 rounded`} />
                      <span className="flex-1">{item.name}</span>
                      {item.shared && (
                        <Share2 className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Projects */}
          {!isGuruEmail && (
            <div className="mt-2">
              <button
                onClick={() => setProjectsExpanded(!projectsExpanded)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-md transition"
              >
                <span className="flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  Projects
                  <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {projectItems.length}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Plus className="w-4 h-4 text-blue-400" />
                  {projectsExpanded ? (
                    <ChevronDown className="w-4 h-4 text-blue-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  )}
                </span>
              </button>
              {projectsExpanded && (
                <div className="mt-1 flex flex-col gap-1 ml-4">
                  {projectItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md cursor-pointer transition">
                      <Folder className={`w-4 h-4 ${item.color} bg-opacity-20 rounded`} />
                      <span className="flex-1">{item.name}</span>
                      {item.shared && (
                        <Share2 className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AI Assistant */}
          {!isGuruEmail && (
            <div className="mt-6 px-2">
              <div className="rounded-md bg-blue-50 p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-800 mb-1">Get Trenning AI</div>
                  <div className="text-xs text-gray-500 mb-2">Use AI in every action on Trenning webapp</div>
                  <button className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                    Try it now <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* User Profile */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.role === 'teacher' ? 'Guru/Wali Kelas' : user?.role === 'admin' ? 'Administrator' : 'Siswa'}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}