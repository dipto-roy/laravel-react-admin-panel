# Laravel + Inertia.js + React Admin Panel

A modern, responsive admin panel built with Laravel 12, Inertia.js, and React 19. Features include student card management, table data operations, authentication, and a beautiful dashboard with image upload capabilities.

## 🚀 Features

- **Modern Tech Stack**: Laravel 12 + Inertia.js + React 19 + TailwindCSS 4 + DaisyUI
- **Student Card Management**: Create, view, and manage student cards with image uploads
- **Responsive Design**: Fully responsive UI that works on all devices
- **Dashboard Analytics**: Beautiful dashboard with charts and statistics
- **Table Management**: CRUD operations for courses, classes, departments, and subjects
- **Image Upload**: Support for profile image uploads with preview
- **Pagination**: Built-in pagination for data tables
- **Authentication**: Secure login system
- **Dark Mode Support**: Theme switching capability

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- PHP >= 8.2
- Composer
- Node.js >= 18.x
- NPM or Yarn
- MySQL >= 8.0
- Git

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/bijitdebwb/admin-Template-wbsoft.git
cd admin-Template-wbsoft
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node Dependencies

```bash
npm install
```

### 4. Environment Setup

```bash
# Copy the example env file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Database Configuration

Edit `.env` file and configure your database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

### 6. Run Migrations

```bash
php artisan migrate
```

### 7. Create Storage Symlink

```bash
php artisan storage:link
```

### 8. Create Upload Directories

```bash
mkdir -p public/uploads/cards
chmod -R 775 public/uploads
chmod -R 775 storage
```

## 🚀 Running the Application

### Development Mode

You need to run two terminals:

**Terminal 1 - Laravel Backend:**

```bash
php artisan serve
```

**Terminal 2 - Vite Frontend:**

```bash
npm run dev
```

Then open your browser and visit: `http://127.0.0.1:8000`

### Production Build

```bash
npm run build
```

## 📁 Project Structure

```
├── app/
│   ├── Http/
│   │   └── Controllers/      # Laravel controllers
│   └── Models/               # Eloquent models
├── database/
│   ├── migrations/           # Database migrations
│   └── seeders/              # Database seeders
├── public/
│   └── uploads/              # User uploaded files
├── resources/
│   ├── js/
│   │   ├── Components/       # React components
│   │   ├── Layouts/          # Layout components
│   │   └── Pages/            # Inertia pages
│   └── views/
│       └── app.blade.php     # Main blade template
├── routes/
│   └── web.php              # Web routes
└── src/                     # Frontend source files
    ├── assets/              # Static assets
    ├── componentes/         # Reusable components
    ├── Pages/               # Page components
    └── index.css            # Global styles
```

## 🎨 Key Features

### Student Card Management

- Create student cards with profile images
- View cards in a responsive grid layout
- Pagination support
- Image upload with preview
- Form validation

### Dashboard

- Analytics cards with statistics
- Charts and visualizations
- Responsive layout
- Quick access to all features

### Table Management

- CRUD operations for:
  - Courses
  - Classes
  - Departments
  - Subjects
- Search and filter capabilities
- Pagination
- Responsive tables

## 🔐 Authentication

The application includes a secure authentication system. Default credentials can be set up using seeders.

## 🎨 Customization

### Colors

Edit `src/index.css` to customize the color scheme:

```css
:root {
  --color-primary: #1daa61;
  --color-secondary: #e1e1e4;
  /* ... more colors */
}
```

### Components

All React components are located in:

- `resources/js/Components/` - Shared components
- `resources/js/Pages/` - Page-specific components
- `src/componentes/` - Additional reusable components

## 📦 Technologies Used

- **Backend**: Laravel 12
- **Frontend Framework**: React 19
- **Routing**: Inertia.js 2.0
- **Styling**: TailwindCSS 4 + DaisyUI 5
- **Build Tool**: Vite 5
- **Icons**: React Icons
- **Notifications**: React Toastify

## 🐛 Known Issues

- Duplicate email error is handled with proper validation
- Image uploads are stored in `public/uploads/cards/`
- Make sure to set proper permissions for upload directories

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open-source and available under the MIT License.

## 👨‍💻 Author

**Bijit Deb**

- GitHub: [@bijitdebwb](https://github.com/bijitdebwb)

## 🙏 Acknowledgments

- Laravel Framework
- Inertia.js
- React
- TailwindCSS
- DaisyUI

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

Made with ❤️ by Bijit Deb
