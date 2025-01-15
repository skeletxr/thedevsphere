import { NextResponse } from "next/server";
import { supabase } from "@/supabase";

export async function POST(req) {
  const body = await req.json();
  const { type } = body;

  if (type === "CourseData") {
    const { type, data: CourseName } = body;
    // //console.log("data", { type, CourseName });

    try {
      // Fetch a course by its name
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("course_name", CourseName); // Filter by course name

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
      console.error("Error fetching course by name:", error.message);
      return NextResponse.json(
        { message: "Data Not available" },
        { status: 400 }
      );
    }
  } else if (type === "CourseList") {
    const [id, videoType] = body.data;

    try {
      const { data, error } = await supabase
        .from("playlist")
        .select("video_id, title, video_type")
        .eq("user_id", id)
        .eq("video_type", videoType);

      if (error) {
        throw error;
      }

      return NextResponse.json(
        { message: "Data available", data },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching playlists:", error.message);
      return NextResponse.json(
        { message: "Data Not available" },
        { status: 400 }
      );
    }
  }
}
