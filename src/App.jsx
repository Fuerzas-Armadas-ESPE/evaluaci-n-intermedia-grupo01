// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import TaskApp from './components/Task/TaskApp';
import RolApp from './components/Rol/RolApp';
import TeacherApp from './components/Teacher/TeacherApp';
import TopicApp from './components/Topic/TopicApp';
import StudentApp from './components/Student/StudentApp';
import GradeApp from './components/Grade/GradeApp';
import ActivityApp from './components/Activity/ActivityApp';
import Home from './Home'; // Import the Home component

import './index.css';

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
	const [user, setUser] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		const session = supabase.auth.getSession();
		setUser(session?.user);
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			switch (event) {
				case 'SIGNED_IN':
					setUser(session?.user);
					break;
				case 'SIGNED_OUT':
					setUser(null);
					break;
				default:
			}
		});
		return () => {
			supabase.auth.onAuthStateChange((event, session) => { });
		};
	}, []);

	const login = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
		});
	};

	const logout = async () => {
		await supabase.auth.signOut();
		setUser(null);
		// Redirigir a la página de inicio después de cerrar sesión
		window.location.href = "/";
	};

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<Router>
			<div>
				{user && (
					<AppBar position="fixed">
						<Toolbar>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								onClick={handleMenuClick}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Sistema de Gestión de Curso para Docentes
							</Typography>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorEl)}
								onClose={handleMenuClose}
							>
								<MenuItem onClick={handleMenuClose}>
									<NavLink to="/home" activeClassName="active" style={{ textDecoration: 'none' }}>
										Home
									</NavLink>
								</MenuItem>
								<MenuItem onClick={handleMenuClose}>
									<NavLink to="/tasks" activeClassName="active" style={{ textDecoration: 'none' }}>
										Tasks
									</NavLink>
								</MenuItem>
								<MenuItem onClick={handleMenuClose}>
									<NavLink to="/roles" activeClassName="active" style={{ textDecoration: 'none' }}>
										Roles
									</NavLink>
								</MenuItem>
								<MenuItem onClick={handleMenuClose}>
									<NavLink to="/teachers" activeClassName="active" style={{ textDecoration: 'none' }}>
										Teachers
									</NavLink>
								</MenuItem>
								<MenuItem onClick={handleMenuClose}>
									<NavLink to="/students" activeClassName="active" style={{ textDecoration: 'none' }}>
										Students
									</NavLink>
								</MenuItem>
								<MenuItem onClick={handleMenuClose}>
									<NavLink to="/grades" activeClassName="active" style={{ textDecoration: 'none' }}>
										Grades
									</NavLink>
								</MenuItem>
								<MenuItem onClick={handleMenuClose}>
									<NavLink to="/activities" activeClassName="active" style={{ textDecoration: 'none' }}>
										Activities
									</NavLink>
								</MenuItem>
								<MenuItem onClick={handleMenuClose}>
									<NavLink to="/topics" activeClassName="active" style={{ textDecoration: 'none' }}>
										Topics
									</NavLink>
								</MenuItem>
							</Menu>
							<Button color="inherit" onClick={logout}>
								Logout
							</Button>
						</Toolbar>
					</AppBar>
				)}

				<Routes>
					<Route path="/home" element={<Home supabase={supabase} />} />
					<Route path="/tasks" element={<TaskApp supabase={supabase} />} />
					<Route path="/roles" element={<RolApp supabase={supabase} />} />
					<Route path="/teachers" element={<TeacherApp supabase={supabase} />} />
					<Route path="/students" element={<StudentApp supabase={supabase} />} />
					<Route path="/grades" element={<GradeApp supabase={supabase} />} />
					<Route path="/activities" element={<ActivityApp supabase={supabase} />} />
					<Route path="/topics" element={<TopicApp supabase={supabase} />} />
				</Routes>

				{!user && <button onClick={login}>Login with Github</button>}
			</div>
		</Router>
	);
}
