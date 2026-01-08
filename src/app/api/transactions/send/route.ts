import { NextResponse } from "next/server";
import { errorHandler } from "@/src/app/api/_shared/utils/errorHandler";
import { authGuard } from "../../_shared/utils/authGuard";

// export const POST = errorHandler(
//   authGuard(async (req: Request) => {
//     const data = await req.json();

//     console.log(data)

//     return NextResponse.json(null);
//   })
// );
