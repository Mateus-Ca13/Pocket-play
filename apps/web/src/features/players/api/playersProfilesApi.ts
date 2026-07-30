import { httpClient } from "@/shared/api/httpClient";
import type { EditPlayerProfileRequest, EditPlayerProfileResult } from "@pocket-play/contracts";


export async function editPlayerProfileApi(params: EditPlayerProfileRequest): Promise<EditPlayerProfileResult> {
    const response = await httpClient.put('/players-profiles', params);
    return response.data;
}