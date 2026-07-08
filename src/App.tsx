/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Layout from './app/layout';

// Import all App entries
import DashboardPageEntry from './app/page';
import WebPageEntry from './app/web/page';
import LandingSectionsEntry from './app/web/landing-sections/page';
import WebPagesEntry from './app/web/pages/page';
import BlogEntry from './app/web/blog/page';
import FAQEntry from './app/web/faq/page';
import NavigationEntry from './app/web/navigation/page';
import SEOEntry from './app/web/seo/page';
import MediaEntry from './app/web/media/page';
import FormsEntry from './app/web/forms/page';
import WebLogsEntry from './app/web/logs/page';
import DemoRecordsEntry from './app/demo-records/page';
import PlatformEntry from './app/platform/page';
import PlatformDashboardEntry from './app/platform/dashboard/page';
import PlatformTenantsEntry from './app/platform/tenants/page';
import PlatformUsersEntry from './app/platform/users/page';
import PlatformRolesEntry from './app/platform/roles/page';
import PlatformPackagesEntry from './app/platform/packages/page';
import PlatformSettingsEntry from './app/platform/settings/page';
import PlatformLogsEntry from './app/platform/logs/page';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');

  // On mount, read hash and bind event listener for native back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove '#'
      setCurrentPath(hash || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial load check
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  // Switch based on current active route path
  const renderActivePage = () => {
    switch (currentPath) {
      case '/':
        return <DashboardPageEntry />;
      case '/web':
        return <WebPageEntry onNavigate={handleNavigate} />;
      case '/web/landing-sections':
        return <LandingSectionsEntry />;
      case '/web/pages':
        return <WebPagesEntry />;
      case '/web/blog':
        return <BlogEntry />;
      case '/web/faq':
        return <FAQEntry />;
      case '/web/navigation':
        return <NavigationEntry />;
      case '/web/seo':
        return <SEOEntry />;
      case '/web/media':
        return <MediaEntry />;
      case '/web/forms':
        return <FormsEntry />;
      case '/web/logs':
        return <WebLogsEntry />;
      case '/demo-records':
        return <DemoRecordsEntry />;
      case '/platform':
        return <PlatformEntry />;
      case '/platform/dashboard':
        return <PlatformDashboardEntry />;
      case '/platform/tenants':
        return <PlatformTenantsEntry />;
      case '/platform/users':
        return <PlatformUsersEntry />;
      case '/platform/roles':
        return <PlatformRolesEntry />;
      case '/platform/packages':
        return <PlatformPackagesEntry />;
      case '/platform/settings':
        return <PlatformSettingsEntry />;
      case '/platform/logs':
        return <PlatformLogsEntry />;
      default:
        return <DashboardPageEntry />;
    }
  };

  return (
    <Layout currentPath={currentPath} onNavigate={handleNavigate}>
      {renderActivePage()}
    </Layout>
  );
}

