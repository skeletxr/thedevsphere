import { NextResponse } from "next/server";
import { supabase } from '@/supabase';





export async function POST(req) {
  const body = await req.json(); 

   
   if(type === "CourseData"){
      
   const {type, data: CourseName}  = body;
   console.log("data", {type, CourseName});


    try {
      // Fetch a course by its name
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('course_name', CourseName); // Filter by course name
  
      if (error) {
        throw error;
      }
  
      // Return the course data
      // return {
      //   success: true,
      //   course: data.length ? data[0] : null, // Return the course or null if not found
      // };
      return NextResponse.json(
        { message: "Data available", data: data.length ? data[0] : null },
        { status: 200 }
      );

    } catch (error) {
      console.error('Error fetching course by name:', error.message);
      return NextResponse.json(
        { message: "Data Not available" },
        { status: 400 }
      );
    }
  } else if(type === "CourseList"){
  console.log("CourseList", body);
    
      try {
        // Query the playlists table by id and video_type
        const { data, error } = await supabase
          .from('playlists')
          .select('user_id, videos, updated_at') // Specify the fields you want to retrieve
          .eq('id', id) // Filter by id
          .eq('video_type', videoType); // Filter by video_type
    
        if (error) {
          throw error; // Handle any errors
        }
    
        // Check if data exists
        if (data.length === 0) {
          console.log('No matching playlists found.');
          return { message: 'No matching playlists found', data: [] };
        }
    
        console.log('Matching playlists fetched successfully:', data);
        return { message: 'Playlists fetched successfully', data };
      } catch (error) {
        console.error('Error fetching playlists:', error.message);
        return { error: error.message };
      }
    }
    
    return NextResponse.json(
      { message: "Invalid request type" },
      { status: 400 }
    );
  // }
}