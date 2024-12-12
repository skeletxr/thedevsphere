import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import HomeIcon from '@mui/icons-material/Home';
import DetailsIcon from '@mui/icons-material/Details';
import CourseDetails from './CourseDetails';
import { useNavigate } from 'react-router-dom';


const NAVIGATION = [
 
  {
    segment: 'Home',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'Course Details',
    title: 'Course Details',
    icon: <DetailsIcon />,
  },
 
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function Course(props) {
  
  const navigate = useNavigate();

  const { window } = props;

  const router = useDemoRouter('/Course Details');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
      {
        router.pathname === '/Home' ? (
          navigate('/')
        ) : (
           <CourseDetails/>
        )
      }
         
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}


















// const NAVIGATION = [
//   // {
//   //   kind: 'header',
//   //   title: 'Main items',
//   // },
//   {
//     segment: 'Home',
//     title: 'Home',
//     icon: <HomeIcon />,
//   },
//   {
//     segment: 'Course Details',
//     title: 'Course Details',
//     icon: <DetailsIcon />,
//   },
//   // {
//   //   kind: 'divider',
//   // },
//   // {
//   //   kind: 'header',
//   //   title: 'Analytics',
//   // },
//   // {
//   //   segment: 'reports',
//   //   title: 'Reports',
//   //   icon: <BarChartIcon />,
//   //   children: [
//   //     {
//   //       segment: 'sales',
//   //       title: 'Sales',
//   //       icon: <DescriptionIcon />,
//   //     },
//   //     {
//   //       segment: 'traffic',
//   //       title: 'Traffic',
//   //       icon: <DescriptionIcon />,
//   //     },
//   //   ],
//   // },
//   // {
//   //   segment: 'integrations',
//   //   title: 'Integrations',
//   //   icon: <LayersIcon />,
//   // },
// ];

// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: 'class',
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function useDemoRouter(initialPath) {
//   const [pathname, setPathname] = React.useState(initialPath);

//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path) => setPathname(String(path)),
//     };
//   }, [pathname]);

//   return router;
// }

// const Skeleton = styled('div')(({ theme, height }) => ({
//   backgroundColor: theme.palette.action.hover,
//   borderRadius: theme.shape.borderRadius,
//   height,
//   content: '" "',
// }));

// export default function Course(props) {
//   const { window } = props;

//   const router = useDemoRouter('/Course Details');

//   // Remove this const when copying and pasting into your project.
//   const demoWindow = window ? window() : undefined;

//   return (
//     <AppProvider
//       navigation={NAVIGATION}
//       router={router}
//       theme={demoTheme}
//       window={demoWindow}
//     >
//       <DashboardLayout>
//         <PageContainer>
//         <div className="card bg-base-100 w-96 shadow-xl">
//   <figure>
//     <img
//       src="https://d502jbuhuh9wk.cloudfront.net/courses/64eebdb8e4b0a14befedc15d/64eebdb8e4b0a14befedc15d_scaled_cover.jpg?v=6"
//       alt="Shoes" />
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">Shoes!</h2>
//     <p>If a dog chews shoes whose shoes does he choose?</p>
//     <div className="card-actions justify-end">
//       <button className="btn btn-primary">Buy Now</button>
//     </div>
//   </div>
// </div>
//           {/* <Grid container spacing={1}>
//             <Grid size={5} />
//             <Grid size={12}>
//               <Skeleton height={14} />
//             </Grid>
//             <Grid size={12}>
//               <Skeleton height={14} />
//             </Grid>
//             <Grid size={4}>
//               <Skeleton height={100} />
//             </Grid>
//             <Grid size={8}>
//               <Skeleton height={100} />
//             </Grid>

//             <Grid size={12}>
//               <Skeleton height={150} />
//             </Grid>
//             <Grid size={12}>
//               <Skeleton height={14} />
//             </Grid>

//             <Grid size={3}>
//               <Skeleton height={100} />
//             </Grid>
//             <Grid size={3}>
//               <Skeleton height={100} />
//             </Grid>
//             <Grid size={3}>
//               <Skeleton height={100} />
//             </Grid>
//             <Grid size={3}>
//               <Skeleton height={100} />
//             </Grid>
//           </Grid> */}
//         </PageContainer>
//       </DashboardLayout>
//     </AppProvider>
//   );
// }
