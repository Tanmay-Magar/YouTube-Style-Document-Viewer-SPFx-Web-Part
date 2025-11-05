
// import { sp } from "@pnp/sp";
 
// import "@pnp/sp/webs";
 
// import "@pnp/sp/lists";
 
// import "@pnp/sp/items";

// export class SPService2 {
//   // private context: any;

//   constructor(private context: any) {
//         sp.setup({
//           spfxContext: this.context,
//         });
  
//       }

//   // public async getListInfo(listName: string): Promise<any[]> {
//   //   try {
//   //     const items = await sp.web.lists.getByTitle(listName).items.select('FileRef', 'FileLeafRef', 'Summary', 'Created').orderBy('Created',false).get();
//   //     return items;
//   //   } catch (error) {
//   //     console.error("Error fetching list info:", error);
//   //     return [];
//   //   }
//   // }

//   public async getListInfo(listName: string): Promise<any[]> {
//     try {
//       const items = await sp.web.lists.getByTitle(listName).items.select('FileRef', 'FileLeafRef', 'Summary', 'Created', 'Month', 'Year').orderBy('Created',false).get();
//       return items;
//     } catch (error) {
//       console.error("Error fetching list info:", error);
//       return [];
//     }
//   }
// }


import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
// import "@pnp/sp/folders";

// Define a type that includes your custom fields
interface ICustomFields {
  Summary: string;
  Month: string;
  Year: string;
}

export class SPService2 {
  constructor(private context: any) {
    sp.setup({
      spfxContext: this.context,
    });
  }

  public async getListInfo(folderPath: string): Promise<any[]> {
    try {
      
      const webServerRelativeUrl = this.context.pageContext.web.serverRelativeUrl;

      const folder = sp.web.getFolderByServerRelativeUrl(`${webServerRelativeUrl}/${folderPath}`);

      const files = await folder.files.orderBy('TimeLastModified', false).get();

      // Fetch the associated list item for each file to get the custom fields
      const items = await Promise.all(
        files.map(async (file) => {
          const listItem = await sp.web.getFileByServerRelativeUrl(file.ServerRelativeUrl).getItem<ICustomFields>();

          return {
            FileRef: file.ServerRelativeUrl,
            FileLeafRef: file.Name,
            Summary: listItem.Summary,  // Custom field
            Month: listItem.Month,      // Custom field
            Year: listItem.Year,        // Custom field
            Created: file.TimeLastModified
          };
        })
      );

      return items;
    } catch (error) {
      console.error("Error fetching folder items:", error);
      return [];
    }
  }
}