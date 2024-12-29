using Newtonsoft.Json;
using Scale.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
namespace Scale
{
    internal class Program
    {
        //static readonly string cookies = "_ga=GA1.1.2028370190.1725892268; _identity-ilovepdf=6bbbdd577986cfdbd7b21f63d42ce351cd882000de54cfea965a7564c7d08456a%3A2%3A%7Bi%3A0%3Bs%3A18%3A%22_identity-ilovepdf%22%3Bi%3A1%3Bs%3A56%3A%22%5B106875571%2C%22Ik-ot7nZsXlrh5ZxPcZtOkWu3ariwaml%22%2C311040000%5D%22%3B%7D; __stripe_mid=4db26832-690f-4a2c-82c0-5e409e40d1c939d61d; fpu0=0; fpu1=1; ib={\"p\":\"l\",\"t\":3}; __gads=ID=c5b7c57eea6c3890:T=1725892672:RT=1735121500:S=ALNI_MbfiK6dzC-ZACvgSdwmq7WgEQM7-A; __gpi=UID=00000ef612a75695:T=1725892672:RT=1735121500:S=ALNI_MZdO4K3oR3HiJROJ1HZXGwlQuwCjA; __eoi=ID=fefae0d0cf993341:T=1725892672:RT=1735121500:S=AA-AfjZxlqZim6iHtHk5xBl5dErm; cto_bundle=-GbBd19pbnFvMSUyRk5SaHJQcGtobHZucTZLV3g0dUk2Nm9ZVk1jeWtuOTFmU3ZoZ1lxNzRHS2p5YlRPYnRHZzhsd1lBZ2I1dWwlMkYlMkJOcVp3RUI2dExwRjlDcmVLVFNFNjhnJTJCVDRlMm43V3ljN2xQRjg2SFJ6cEVmJTJCbEF5QVdtbDg1VmtDTHNXeUNXNkd3JTJCS1hDeGhlM3dqQSUyRkFEZyUzRCUzRA; _ilovepdf=ce69b0607dd9781e17cc05506717c989; last_page=d0d871453a5f7fd9dce313869139fc1282c838bb23ed01132b06aa39f1d596b4a%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22last_page%22%3Bi%3A1%3BN%3B%7D; page=fd9ef5cd6a1c41369e8f4077f1d0df5a64702120deaf6e0fb0b47032f9c23f70a%3A2%3A%7Bi%3A0%3Bs%3A4%3A%22page%22%3Bi%3A1%3Bs%3A12%3A%22tool%2Fupscale%22%3B%7D; _csrf-ilovepdf=ec87c409ae00ba9e0211b68f9508603e2ad1e756934c81aa22590c19d548c856a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-ilovepdf%22%3Bi%3A1%3Bs%3A32%3A%22Y4kLImJZlaSbmWKghklYPvH3NH8v2x0k%22%3B%7D; last_tool=e94005e203c635fe2200423d03eaaa4c3dc923cd072c76e89540a3778f4f2937a%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22last_tool%22%3Bi%3A1%3Bs%3A7%3A%22upscale%22%3B%7D; _ga_Q8FHV8BBZ6=GS1.1.1735202315.25.1.1735202325.50.0.0; lastTool=upscale; pulse=1; __cf_bm=fhmAwWidAACCiDL_JJHwSS_LolnYp1ECjzlHZKKIjHI-1735203565-1.0.1.1-q8ygCMi5zE1L2JjFTWgtLyfaiad0yfeujzkV2wvPuDo1cG77zFa7LPuQFL7NKDDgTkjhP63zG33QMxWqPg_QkA";
        static readonly string token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJhdWQiOiIiLCJpYXQiOjE1MjMzNjQ4MjQsIm5iZiI6MTUyMzM2NDgyNCwianRpIjoicHJvamVjdF9wdWJsaWNfYzkwNWRkMWMwMWU5ZmQ3NzY5ODNjYTQwZDBhOWQyZjNfT1Vzd2EwODA0MGI4ZDJjN2NhM2NjZGE2MGQ2MTBhMmRkY2U3NyJ9.qvHSXgCJgqpC4gd6-paUlDLFmg0o2DsOvb1EUYPYx_E";
        static readonly string userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0";

        static readonly string[] servers = ["api1g", "api2g", "api3g", "api7g", "api8g", "api9g", "api10g", "api11g", "api12g", "api13g", "api14g", "api15g", "api16g", "api17g", "api18g", "api19g", "api20g", "api1g", "api1g", "api1g", "api2g", "api2g", "api2g", "api3g", "api3g", "api3g", "api11g", "api11g", "api11g"];
        static string server = "";

        static string? scale = "";
        static string? folderContainImages = "";
        static string? folderToSaveImages = "";
        static string? taskId = "";
        static List<string> imageFilePaths = [];

        static async Task Main(string[] args)
        {
            LogTitle();

            while (true)
            {
                Console.Write("Input folder contains images: ");
                folderContainImages = Console.ReadLine();

                if(folderContainImages == null)
                {
                    Console.WriteLine("Error: Folder is not valid.");
                }
                else if (string.IsNullOrEmpty(folderContainImages.Trim()))
                {
                    Console.WriteLine("Error: Folder is not valid.");
                }
                else if (Directory.Exists(folderContainImages) == false)
                {
                    Console.WriteLine("Error: Folder is not exists.");
                }
                else
                {
                    folderContainImages = folderContainImages.Trim();
                    break;
                }
            }

            while (true)
            {
                Console.Write("Input folder to save images after scale: ");
                folderToSaveImages = Console.ReadLine();
                if (folderToSaveImages == null)
                {
                    Console.WriteLine("Error: Folder to save images is not valid.");
                }
                else if (string.IsNullOrEmpty(folderToSaveImages.Trim()))
                {
                    Console.WriteLine("Error: Folder to save images is not valid.");
                }
                else if (Directory.Exists(folderToSaveImages) == false)
                {
                    Console.WriteLine("Error: Folder to save images is not valid.");
                }
                else
                {
                    folderToSaveImages = folderToSaveImages.Trim();
                    break;
                }
            }

            while (true)
            {
                Console.Write("Input scale level, 2 or 4: ");
                scale = Console.ReadLine();
                if (scale == null)
                {
                    Console.WriteLine("Error: Scale level is not valid.");
                }
                else if (string.IsNullOrEmpty(scale))
                {
                    Console.WriteLine("Error: Scale level is not valid.");
                }
                else if (scale != "2" && scale != "4")
                {
                    Console.WriteLine("Error: Scale level is not valid.");
                }
                else
                {
                    scale = scale.Trim();
                    break;
                }
            }

            #region GET FILE PATHS  

            Console.WriteLine("============= GET FILE PATHS =============");

            // Mảng các phần mở rộng của ảnh mà bạn muốn lọc
            string[] imageExtensions = new string[] { "*.jpg", "*.jpeg", "*.png" };

            foreach (var extension in imageExtensions)
            {
                imageFilePaths.AddRange(Directory.GetFiles(folderContainImages, extension));
            }

            LogSuccess($"Total: {imageFilePaths.Count()}");
            Console.WriteLine("");
            // Sau khi API hoàn tất, hủy loading

            #endregion

            #region GET TASKID

            Console.WriteLine("============= GET TASKID =============");
            var cts = new CancellationTokenSource();
            var token = cts.Token;
            var loadingTask = Loader(token);

            await Refresh();

            cts.Cancel();
            await loadingTask;

            LogSuccess($"TaskId: {taskId}");
            Console.WriteLine("");

            #endregion

            #region GET SERVER FILE NAMES

            Console.WriteLine($"============= GET SERVER FILE NAMES =============");
            cts = new CancellationTokenSource();
            token = cts.Token;
            loadingTask = Loader(token);
            List<UploadResponse> uploadResponses = await GetServerFileNames();
            cts.Cancel();
            await loadingTask;
            LogSuccess($"Total: {uploadResponses.Count()}");
            Console.WriteLine("");

            if (uploadResponses.Count() == 0)
            {
                Console.WriteLine("No images");
                return;
            }

            #endregion

            #region Scaling

            Console.WriteLine($"============= Scaling...... =============");
            await ScaleImage(uploadResponses);
            Console.WriteLine("");

            #endregion

            LogSuccess("......End......");
            LogSuccess("......Press any key to exit......");
            Console.ReadKey();
        }

        static async Task Refresh()
        {
            Random random = new Random();
            server = servers[random.Next(0, servers.Length)];

            taskId = await GetTaskId();

            if (string.IsNullOrEmpty(taskId))
            {
                return;
            }
        }

        static async Task<string?> GetTaskId()
        {
            string url = "https://www.iloveimg.com/upscale-image";

            try
            {
                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromMinutes(5); // Tăng thời gian chờ lên 5 phút

                    client.DefaultRequestHeaders.Add("User-Agent", userAgent);
                    var responseTaskId = await client.GetAsync(url);
                    // Đảm bảo rằng response là thành công
                    responseTaskId.EnsureSuccessStatusCode();

                    // Đọc nội dung của trang web
                    string contentTaskId = await responseTaskId.Content.ReadAsStringAsync();

                    string pattern = @"ilovepdfConfig\.taskId\s*=\s*'([^']*)'";
                    Match match = Regex.Match(contentTaskId, pattern);

                    if (match.Success)
                    {
                        var taskId = match.Groups[1].Value;

                        return taskId;
                    }
                    else
                    {
                        LogError("?????????? Cannot get TasskId ??????????");
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                LogError($"?????????? Error when get taskId (GetTaskId): {ex.Message} ??????????");
                return null;
            }
        }

        static async Task<List<UploadResponse>> GetServerFileNames()
        {
            List<UploadResponse> uploadResponses = [];
            try
            {
                string uploadUrl = $"https://{server}.iloveimg.com/v1/upload";

                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromMinutes(5); // Tăng thời gian chờ lên 5 phút
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                    client.DefaultRequestHeaders.Add("User-Agent", userAgent);

                    for (int i = 0; i < imageFilePaths.Count(); i++)
                    {
                        // Thêm tệp vào form data
                        var fileContent = new ByteArrayContent(File.ReadAllBytes(imageFilePaths[i])); // Thay bằng đường dẫn đến tệp bạn muốn tải lên
                        fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("image/jpeg"); // Hoặc kiểu tệp của bạn (ví dụ: image/jpeg)
                        var bytes = await fileContent.ReadAsByteArrayAsync();

                        var form = new MultipartFormDataContent
                        {
                            { new ByteArrayContent(bytes), "file", Path.GetFileName(imageFilePaths[i]) },
                            { new StringContent(Path.GetFileName(imageFilePaths[i])), "name" },
                            { new StringContent("0"), "chunk" },
                            { new StringContent("1"), "chunks" },
                            { new StringContent(taskId!), "task" },
                            { new StringContent("1"), "preview" },
                            { new StringContent("0"), "pdfinfo" },
                            { new StringContent("0"), "pdfforms" },
                            { new StringContent("0"), "pdfresetforms" },
                            { new StringContent("web.0"), "v" }
                        };

                        var response = await client.PostAsync(uploadUrl, form);
                        response.EnsureSuccessStatusCode(); // Kiểm tra phản hồi có thành công không

                        string responseContent = await response.Content.ReadAsStringAsync();
                        UploadResponse? uploadResponse = JsonConvert.DeserializeObject<UploadResponse>(responseContent);

                        fileContent.Dispose();

                        if (uploadResponse != null)
                        {
                            uploadResponses.Add(uploadResponse);
                        }
                        else
                        {
                            LogError($"?????????? Cannot convert convert (GetServerFileNames): {imageFilePaths[i]} ??????????");
                            LogError("Uplado response: " + responseContent);
                        }

                        await Task.Delay(600);
                    }
                    return uploadResponses;
                }
            }
            catch (Exception ex)
            {
                LogError($"Khong thay TasskId: {ex.Message}");
                return [];
            }
        }

        static async Task ScaleImage(List<UploadResponse> uploadResponses)
        {
            string scaleUrl = $"https://{server}.iloveimg.com/v1/upscale";
            try
            {
                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromMinutes(5); // Tăng thời gian chờ lên 5 phút
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
                    client.DefaultRequestHeaders.Add("User-Agent", userAgent);

                    foreach (var uploadResponse in uploadResponses)
                    {
                        var form = new MultipartFormDataContent
                        {
                            { new StringContent(taskId!), "task" },
                            { new StringContent(uploadResponse.server_filename), "server_filename" },
                            { new StringContent(scale!), "scale" },
                        };


                        var cts = new CancellationTokenSource();
                        var token = cts.Token;
                        var loadingTask = Loader(token);

                        var response = await client.PostAsync(scaleUrl, form);

                        //string responseContent2 = await response.Content.ReadAsStringAsync();
                        response.EnsureSuccessStatusCode();

                        // Đọc dữ liệu mảng byte từ phản hồi
                        byte[] imageBytes = await response.Content.ReadAsByteArrayAsync();

                        cts.Cancel();
                        await loadingTask;

                        //string downloadsPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "Downloads");
                        //string filePath = Path.Combine(downloadsPath, server_filename);

                        string filePath = Path.Combine(folderToSaveImages!, uploadResponse.server_filename);

                        // Lưu ảnh vào file
                        LogSuccess($"Saving..... {filePath}");
                        await File.WriteAllBytesAsync(filePath, imageBytes);
                        LogSuccess($"---- Save successfully: {filePath}");

                        await Task.Delay(1200);
                    }
                }
            }
            catch (Exception ex)
            {
                LogError($"?????????? Error when scale: {ex.ToString()} ??????????");
            }
        }

        static async Task Loader(CancellationToken token)
        {
            var frames = new[]
            {
                "[          ]",
                "[█         ]",
                "[██        ]",
                "[███       ]",
                "[████      ]",
                "[█████     ]",
                "[██████    ]",
                "[███████   ]",
                "[████████  ]",
                "[█████████ ]",
                "[██████████]"
            };
            Console.ForegroundColor = ConsoleColor.Yellow;
            int i = 0;
            while (!token.IsCancellationRequested)
            {
                if (i >= frames.Length)
                {
                    i = 0;
                }
                Console.Write($"\r{frames[i]}"); // Ghi đè dòng hiện tại
                await Task.Delay(100);
                i++;
            }

            Console.Write($"\r{frames[frames.Length-1]}"); // Ghi đè dòng hiện tại
            Console.WriteLine();
            Console.ResetColor();
        }

        static void LogError(string message)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(message);
            Console.ResetColor();
        }

        static void LogSuccess(string message)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(message);
            Console.ResetColor();
        }

        static void LogTitle()
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("   _____          __             _________             .__  .__                 ___________           .__   \r\n  /  _  \\  __ ___/  |_  ____    /   _____/ ____ _____  |  | |__| ____    ____   \\__    ___/___   ____ |  |  \r\n /  /_\\  \\|  |  \\   __\\/  _ \\   \\_____  \\_/ ___\\\\__  \\ |  | |  |/    \\  / ___\\    |    | /  _ \\ /  _ \\|  |  \r\n/    |    \\  |  /|  | (  <_> )  /        \\  \\___ / __ \\|  |_|  |   |  \\/ /_/  >   |    |(  <_> |  <_> )  |__\r\n\\____|__  /____/ |__|  \\____/  /_______  /\\___  >____  /____/__|___|  /\\___  /    |____| \\____/ \\____/|____/\r\n        \\/                             \\/     \\/     \\/             \\//_____/                               ");
            Console.ResetColor();
        }
    }
}
