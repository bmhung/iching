// TRIGRAMS (Pre-Heaven Xiantian numbering 1-8)
// bin = bottom-mid-top, 1=yang, 0=yin
export const TRIGRAMS = [null,
  { n:1, sym:"☰", zh:"乾", py:"Qián", vi:"Càn",  en:"Heaven",   el:"Metal", attrZh:"健", attrVi:"Kiện",  attrEn:"Creative",   famZh:"父",   famVi:"Cha",        famEn:"Father",            dirZh:"西北", dirEn:"NW", bin:"111" },
  { n:2, sym:"☱", zh:"兌", py:"Duì",  vi:"Đoài", en:"Lake",     el:"Metal", attrZh:"悅", attrVi:"Duyệt", attrEn:"Joyful",     famZh:"少女", famVi:"Thiếu nữ",   famEn:"Youngest daughter", dirZh:"西",   dirEn:"W",  bin:"110" },
  { n:3, sym:"☲", zh:"離", py:"Lí",   vi:"Ly",   en:"Fire",     el:"Fire",  attrZh:"麗", attrVi:"Lệ",    attrEn:"Clinging",   famZh:"中女", famVi:"Trung nữ",   famEn:"Middle daughter",   dirZh:"南",   dirEn:"S",  bin:"101" },
  { n:4, sym:"☳", zh:"震", py:"Zhèn", vi:"Chấn", en:"Thunder",  el:"Wood",  attrZh:"動", attrVi:"Động",  attrEn:"Arousing",   famZh:"長男", famVi:"Trưởng nam", famEn:"Eldest son",        dirZh:"東",   dirEn:"E",  bin:"100" },
  { n:5, sym:"☴", zh:"巽", py:"Xùn",  vi:"Tốn",  en:"Wind",     el:"Wood",  attrZh:"入", attrVi:"Nhập",  attrEn:"Penetrating",famZh:"長女", famVi:"Trưởng nữ",  famEn:"Eldest daughter",   dirZh:"東南", dirEn:"SE", bin:"011" },
  { n:6, sym:"☵", zh:"坎", py:"Kǎn",  vi:"Khảm", en:"Water",    el:"Water", attrZh:"陷", attrVi:"Hãm",   attrEn:"Abysmal",    famZh:"中男", famVi:"Trung nam",  famEn:"Middle son",        dirZh:"北",   dirEn:"N",  bin:"010" },
  { n:7, sym:"☶", zh:"艮", py:"Gèn",  vi:"Cấn",  en:"Mountain", el:"Earth", attrZh:"止", attrVi:"Chỉ",   attrEn:"Still",      famZh:"少男", famVi:"Thiếu nam",  famEn:"Youngest son",      dirZh:"東北", dirEn:"NE", bin:"001" },
  { n:8, sym:"☷", zh:"坤", py:"Kūn",  vi:"Khôn", en:"Earth",    el:"Earth", attrZh:"順", attrVi:"Thuận", attrEn:"Receptive",  famZh:"母",   famVi:"Mẹ",         famEn:"Mother",            dirZh:"西南", dirEn:"SW", bin:"000" },
];

// HEX_BY_TRIGRAMS[upper][lower] = King Wen hexagram number
export const HEX_BY_TRIGRAMS = {
  1: {1:1,  2:10, 3:13, 4:25, 5:44, 6:6,  7:33, 8:12}, // Càn ☰ above
  2: {1:43, 2:58, 3:49, 4:17, 5:28, 6:47, 7:31, 8:45}, // Đoài ☱
  3: {1:14, 2:38, 3:30, 4:21, 5:50, 6:64, 7:56, 8:35}, // Ly ☲
  4: {1:34, 2:54, 3:55, 4:51, 5:32, 6:40, 7:62, 8:16}, // Chấn ☳
  5: {1:9,  2:61, 3:37, 4:42, 5:57, 6:59, 7:53, 8:20}, // Tốn ☴
  6: {1:5,  2:60, 3:63, 4:3,  5:48, 6:29, 7:39, 8:8 }, // Khảm ☵
  7: {1:26, 2:41, 3:22, 4:27, 5:18, 6:4,  7:52, 8:23}, // Cấn ☶
  8: {1:11, 2:19, 3:36, 4:24, 5:46, 6:7,  7:15, 8:2 }, // Khôn ☷
};

// HEXAGRAMS — 64 in King Wen order
// Compact row: [u, l, zh, py, vi, en, jZh, jVi, jEn, iVi, iEn]
const HEX_ROWS = [null,
  [1,1,"乾","Qián","Thuần Càn","The Creative","元亨利貞。","Lớn lành, hanh thông, lợi và chính.","Sublime success; furthering through perseverance.","Trời chuyển động mạnh; quân tử tự cường không nghỉ.","Heaven moves with strength; the noble one cultivates ceaseless self-discipline."],
  [8,8,"坤","Kūn","Thuần Khôn","The Receptive","元亨,利牝馬之貞。","Lớn lành; bền bỉ như ngựa cái mới lợi.","Sublime success through the perseverance of a mare.","Thế đất là Khôn; quân tử dùng đức dày chở vạn vật.","Earth is yielding; the noble one bears all things with deep virtue."],
  [6,4,"屯","Zhūn","Thủy Lôi Truân","Difficulty at the Beginning","元亨利貞,勿用有攸往。","Khó khăn ban đầu; chớ vội tiến.","Sprouting through hardship; do not rush forward.","Mây sấm là Truân; quân tử lo việc tổ chức.","Clouds and thunder; the noble one weaves the threads."],
  [7,6,"蒙","Méng","Sơn Thủy Mông","Youthful Folly","亨。匪我求童蒙,童蒙求我。","Sự ngu muội thiếu thời; trò tìm thầy, không phải thầy tìm trò.","Folly seeks the wise; the wise does not seek folly.","Suối từ núi; quân tử quyết hành để dưỡng đức.","A spring from the mountain; the noble one acts decisively to nurture virtue."],
  [6,1,"需","Xū","Thủy Thiên Nhu","Waiting","有孚,光亨,貞吉。","Có lòng tin, sáng thông, giữ chính cát.","With trust, light prevails; perseverance brings fortune.","Mây lên trời; quân tử ăn uống vui chơi đợi thời.","Clouds rise to the sky; the noble one feasts while waiting."],
  [1,6,"訟","Sòng","Thiên Thủy Tụng","Conflict","有孚窒惕,中吉終凶。","Có lòng tin nhưng bị nghẽn; trung thì cát, cuối thì hung.","Truth obstructed; the middle is fortunate, the end ruinous.","Trời nước trái chiều; quân tử lo việc từ đầu.","Sky and water flow apart; the noble one plans every undertaking from the start."],
  [8,6,"師","Shī","Địa Thủy Sư","The Army","貞,丈人吉,无咎。","Giữ chính, có lão thành chỉ huy thì cát, không lỗi.","Perseverance led by the elder; fortune, no fault.","Trong đất có nước; quân tử dung dân, dưỡng chúng.","Water within earth; the noble one tolerates and gathers the people."],
  [6,8,"比","Bǐ","Thủy Địa Tỷ","Holding Together","吉,原筮元永貞。","Cát; nguyên đầu xem bói, lâu bền và chính.","Fortune; from the first inquiry, lasting truth.","Trên đất có nước; tiên vương lập muôn nước, thân các chư hầu.","Water upon earth; the kings of old founded states and bonded with princes."],
  [5,1,"小畜","Xiǎo Chù","Phong Thiên Tiểu Súc","Small Taming","亨,密雲不雨,自我西郊。","Hanh; mây dày chưa mưa từ vùng Tây.","Success; dense clouds, no rain yet.","Gió đi trên trời; quân tử trau dồi văn đức.","Wind across the sky; the noble one polishes literary virtue."],
  [1,2,"履","Lǚ","Thiên Trạch Lý","Treading","履虎尾,不咥人,亨。","Đi sau đuôi hổ mà không bị cắn; hanh thông.","Treading the tiger's tail unbitten; success.","Trên trời dưới đầm; quân tử phân biện trên dưới.","Heaven above, lake below; the noble one distinguishes high from low."],
  [8,1,"泰","Tài","Địa Thiên Thái","Peace","小往大來,吉亨。","Nhỏ đi, lớn đến; cát hanh.","The small departs, the great arrives; fortunate success.","Trời đất giao; bậc trên thành tựu đạo trời đất.","Heaven and earth meet; the sovereign completes their way."],
  [1,8,"否","Pǐ","Thiên Địa Bĩ","Standstill","之匪人,不利君子貞。","Người không đáng tin; quân tử khó tiến.","Unworthy ones; perseverance does not further the noble.","Trời đất không giao; quân tử kiệm đức tránh nạn.","Heaven and earth do not meet; the noble one withdraws into virtue."],
  [1,3,"同人","Tóng Rén","Thiên Hỏa Đồng Nhân","Fellowship","同人于野,亨。","Đồng tâm hợp lực ngoài đồng rộng; hanh thông.","Fellowship in the open field; success.","Trời với lửa; quân tử phân loại sự vật.","Heaven with fire; the noble one classifies and distinguishes."],
  [3,1,"大有","Dà Yǒu","Hỏa Thiên Đại Hữu","Great Possession","元亨。","Lớn lành, hanh thông.","Sublime success.","Lửa trên trời; quân tử ngăn ác, dương thiện.","Fire over heaven; the noble one curbs evil and exalts good."],
  [8,7,"謙","Qiān","Địa Sơn Khiêm","Modesty","亨,君子有終。","Hanh; quân tử có kết thúc tốt.","Success; the noble one carries through.","Núi giữa đất; quân tử bớt chỗ thừa, thêm chỗ thiếu.","Mountain within earth; the noble one balances surplus and want."],
  [4,8,"豫","Yù","Lôi Địa Dự","Enthusiasm","利建侯行師。","Lợi cho việc dựng nước, cử quân.","Furthering for installing helpers and setting armies in motion.","Sấm ra đất rộn ràng; tiên vương làm nhạc tôn đức.","Thunder bursts forth; the kings of old made music to honor virtue."],
  [2,4,"隨","Suí","Trạch Lôi Tùy","Following","元亨利貞,无咎。","Lớn lành nếu chính trực; không lỗi.","Sublime success through perseverance; no fault.","Sấm trong đầm; quân tử nghỉ ngơi khi trời tối.","Thunder within the lake; the noble one rests at nightfall."],
  [7,5,"蠱","Gǔ","Sơn Phong Cổ","Work on the Decayed","元亨,利涉大川。","Lớn lành; lợi vượt sông lớn.","Sublime success; furthering to cross the great water.","Dưới núi có gió; quân tử khích lệ dân, dưỡng đức.","Wind beneath the mountain; the noble one rouses the people and builds virtue."],
  [8,2,"臨","Lín","Địa Trạch Lâm","Approach","元亨利貞,至于八月有凶。","Lớn lành; đến tháng tám có hung.","Sublime success; misfortune by the eighth month.","Trên đầm là đất; quân tử dạy dỗ không cùng.","Earth above the lake; the noble one teaches without limit."],
  [5,8,"觀","Guān","Phong Địa Quán","Contemplation","盥而不薦,有孚顒若。","Đã rửa tay tế chưa dâng; có lòng tin chiêm bái.","Cleansed but not yet offering; trust shines reverent.","Gió đi trên đất; tiên vương đi xét dân lập giáo.","Wind moves over the earth; the kings inspect and instruct."],
  [3,4,"噬嗑","Shì Kè","Hỏa Lôi Phệ Hạp","Biting Through","亨,利用獄。","Hanh; lợi dùng pháp luật.","Success; the use of law furthers.","Sấm chớp; tiên vương sáng tỏ hình phạt, nghiêm pháp luật.","Thunder and lightning; the rulers make punishments clear."],
  [7,3,"賁","Bì","Sơn Hỏa Bí","Grace","亨,小利有攸往。","Hanh; nhỏ lợi tiến tới.","Success; small ventures further.","Dưới núi có lửa; quân tử sáng tỏ chính sự.","Fire beneath the mountain; the noble one clarifies governance."],
  [7,8,"剝","Bō","Sơn Địa Bác","Splitting Apart","不利有攸往。","Không lợi tiến tới.","Do not advance.","Núi tựa vào đất; bậc trên dày dưới yên nhà.","The mountain rests on earth; superiors strengthen below."],
  [8,4,"復","Fù","Địa Lôi Phục","Return","亨,出入无疾。","Hanh; ra vào không bệnh.","Success; coming and going without affliction.","Sấm trong đất; tiên vương đóng cửa ngày đông chí.","Thunder within the earth; the kings closed gates at the solstice."],
  [1,4,"無妄","Wú Wàng","Thiên Lôi Vô Vọng","Innocence","元亨利貞。","Lớn lành; lợi giữ chính.","Sublime success; furthering through perseverance.","Dưới trời sấm vang; tiên vương theo thời nuôi vạn vật.","Thunder beneath heaven; the kings nurtured all beings with the seasons."],
  [7,1,"大畜","Dà Chù","Sơn Thiên Đại Súc","Great Taming","利貞,不家食吉,利涉大川。","Lợi giữ chính; không ăn tại gia thì cát.","Perseverance furthers; not eating at home is fortunate.","Trời trong núi; quân tử biết rộng lời xưa, hành xưa để dưỡng đức.","Heaven within the mountain; the noble one knows the past to grow virtue."],
  [7,4,"頤","Yí","Sơn Lôi Di","Nourishment","貞吉,觀頤,自求口實。","Giữ chính cát; xem cách nuôi dưỡng; tự cầu lương thực.","Perseverance fortunate; observe nourishment; seek your own sustenance.","Dưới núi có sấm; quân tử cẩn lời, tiết ăn uống.","Thunder beneath the mountain; the noble one watches words and moderates food."],
  [2,5,"大過","Dà Guò","Trạch Phong Đại Quá","Great Excess","棟橈,利有攸往,亨。","Cây đòn dông oằn xuống; lợi tiến tới; hanh.","The ridge-pole bends; advance furthers; success.","Đầm dìm cây; quân tử đứng một mình không sợ.","The lake drowns the tree; the noble one stands alone unafraid."],
  [6,6,"坎","Kǎn","Thuần Khảm","The Abysmal","習坎,有孚,維心亨。","Hiểm chồng hiểm; có lòng tin thì tâm thông.","Repeated abyss; with trust, the heart prevails.","Nước dồn đến; quân tử giữ thường đức, tập việc dạy.","Water arrives upon water; the noble one keeps virtue and practices teaching."],
  [3,3,"離","Lí","Thuần Ly","The Clinging Fire","利貞,亨,畜牝牛吉。","Lợi giữ chính; hanh; nuôi bò cái cát.","Perseverance furthers; success; tending the cow brings fortune.","Sáng kép; đại nhân nối sáng chiếu bốn phương.","Brightness redoubled; the great one shines in all directions."],
  [2,7,"咸","Xián","Trạch Sơn Hàm","Influence","亨,利貞,取女吉。","Hanh; lợi chính; lấy vợ cát.","Success; perseverance furthers; taking a maiden brings fortune.","Trên núi có đầm; quân tử rỗng lòng nhận người.","Lake atop mountain; the noble one receives others with an empty heart."],
  [4,5,"恆","Héng","Lôi Phong Hằng","Duration","亨,无咎,利貞,利有攸往。","Hanh; không lỗi; lợi giữ chính; lợi tiến tới.","Success; no fault; perseverance and advance both further.","Sấm gió; quân tử đứng vững không đổi phương.","Thunder and wind; the noble one stands firm in their direction."],
  [1,7,"遯","Dùn","Thiên Sơn Độn","Retreat","亨,小利貞。","Hanh; nhỏ lợi giữ chính.","Success; small perseverance furthers.","Dưới trời có núi; quân tử lánh tiểu nhân, không ghét mà nghiêm.","Mountain beneath heaven; the noble one withdraws from petty folk."],
  [4,1,"大壯","Dà Zhuàng","Lôi Thiên Đại Tráng","Great Power","利貞。","Lợi giữ chính.","Perseverance furthers.","Sấm trên trời; quân tử không phải lễ thì không bước.","Thunder above heaven; the noble one walks only in accord with rite."],
  [3,8,"晉","Jìn","Hỏa Địa Tấn","Progress","康侯用錫馬蕃庶,晝日三接。","Vua khanh được vua ban ngựa nhiều, một ngày ba lần triều kiến.","The honored prince receives many gifts of horses; thrice received in a day.","Sáng lên khỏi đất; quân tử tự rạng đức sáng.","Light rises from the earth; the noble one brightens their own virtue."],
  [8,3,"明夷","Míng Yí","Địa Hỏa Minh Di","Darkening of the Light","利艱貞。","Lợi giữ chính trong gian khó.","Perseverance through hardship furthers.","Sáng vào trong đất; quân tử lâm chúng, dùng tối mà sáng.","Light enters the earth; the noble one rules using darkness yet illumined."],
  [5,3,"家人","Jiā Rén","Phong Hỏa Gia Nhân","The Family","利女貞。","Lợi cho phụ nữ giữ chính.","The maiden's perseverance furthers.","Gió từ lửa ra; quân tử lời có thực, hành có thường.","Wind issues from fire; the noble one's words have substance, deeds endure."],
  [3,2,"睽","Kuí","Hỏa Trạch Khuê","Opposition","小事吉。","Tiểu sự cát.","In small matters, fortunate.","Trên lửa dưới đầm; quân tử đồng mà dị.","Fire above, lake below; the noble one is alike yet different."],
  [6,7,"蹇","Jiǎn","Thủy Sơn Kiển","Obstruction","利西南,不利東北,利見大人,貞吉。","Lợi tây nam; không lợi đông bắc; lợi gặp đại nhân; chính cát.","Southwest furthers; northeast does not; meet the great one; perseverance brings fortune.","Trên núi có nước; quân tử tự xét, tu đức.","Water atop the mountain; the noble one turns inward to cultivate virtue."],
  [4,6,"解","Xiè","Lôi Thủy Giải","Deliverance","利西南,无所往,其來復吉。","Lợi tây nam; không cần đi đâu; trở lại thì cát.","Southwest furthers; if no further, return brings fortune.","Sấm mưa; quân tử xá lỗi, dung tội.","Thunder and rain; the noble one pardons faults and forgives crimes."],
  [7,2,"損","Sǔn","Sơn Trạch Tổn","Decrease","有孚,元吉,无咎。","Có lòng tin; đại cát; không lỗi.","With sincerity, sublime fortune; no fault.","Dưới núi có đầm; quân tử ngăn giận, dứt dục.","Lake beneath the mountain; the noble one curbs anger and stems desire."],
  [5,4,"益","Yì","Phong Lôi Ích","Increase","利有攸往,利涉大川。","Lợi tiến tới; lợi vượt sông lớn.","Advance furthers; cross the great water.","Gió sấm; quân tử thấy thiện thì theo, có lỗi thì sửa.","Wind and thunder; the noble one moves toward good and corrects faults."],
  [2,1,"夬","Guài","Trạch Thiên Quải","Breakthrough","揚于王庭,孚號有厲。","Phát giác giữa triều; kêu thành tín có nguy.","Proclaimed at the royal court; sincere outcry, with danger.","Đầm trên trời; quân tử ban lộc xuống dưới, ở đức thì tránh kiêu.","Lake above heaven; the noble one shares blessings below."],
  [1,5,"姤","Gòu","Thiên Phong Cấu","Coming to Meet","女壯,勿用取女。","Người nữ mạnh; chớ cưới.","The maid is bold; do not wed her.","Dưới trời có gió; bậc trên ban mệnh khắp bốn phương.","Wind beneath heaven; the sovereign issues commands."],
  [2,8,"萃","Cuì","Trạch Địa Tụy","Gathering Together","亨,王假有廟。","Hanh; vua đến tế tại miếu.","Success; the king visits the temple.","Đầm trên đất; quân tử sửa khí giới, phòng bất trắc.","Lake above earth; the noble one prepares against the unforeseen."],
  [8,5,"升","Shēng","Địa Phong Thăng","Pushing Upward","元亨,用見大人,勿恤,南征吉。","Lớn lành; gặp đại nhân; chớ lo; tiến nam cát.","Sublime success; see the great one; advance south brings fortune.","Trong đất sinh cây; quân tử thuận đức, tích nhỏ thành lớn.","Wood grows from earth; the noble one accumulates the small to attain the great."],
  [2,6,"困","Kùn","Trạch Thủy Khốn","Oppression","亨,貞,大人吉,无咎,有言不信。","Hanh; chính; đại nhân cát; không lỗi; có nói không tin.","Success; perseverance; the great one is fortunate; words may not be trusted.","Đầm không nước; quân tử tận mệnh hoàn chí.","A waterless lake; the noble one risks all to fulfill their will."],
  [6,5,"井","Jǐng","Thủy Phong Tỉnh","The Well","改邑不改井,无喪无得。","Đổi làng không đổi giếng; không mất không được.","Towns may change, the well does not.","Trên cây có nước; quân tử khuyến lao dân, khích lệ giúp nhau.","Water above wood; the noble one urges the people on."],
  [2,3,"革","Gé","Trạch Hỏa Cách","Revolution","巳日乃孚,元亨利貞,悔亡。","Đến ngày Tỵ mới được tin; đại cát chính; hối tan.","On the appointed day, trust is given; sublime success; remorse vanishes.","Trong đầm có lửa; quân tử trị lịch, sáng thời tiết.","Fire within the lake; the noble one regulates the calendar."],
  [3,5,"鼎","Dǐng","Hỏa Phong Đỉnh","The Cauldron","元吉,亨。","Đại cát; hanh.","Sublime fortune; success.","Trên cây có lửa; quân tử chính vị ngưng mệnh.","Fire above wood; the noble one rectifies position and consolidates fate."],
  [4,4,"震","Zhèn","Thuần Chấn","The Arousing Thunder","亨。震來虩虩,笑言啞啞。","Hanh; sấm đến run rẩy, rồi cười nói rộn ràng.","Success; thunder comes — alarm, then laughter.","Sấm dồn; quân tử kính sợ tu tỉnh.","Repeated thunder; the noble one with awe examines themselves."],
  [7,7,"艮","Gèn","Thuần Cấn","Keeping Still","艮其背,不獲其身。","Ngừng nơi lưng; không thấy thân.","Keeping still at the back; the body is not perceived.","Hai núi; quân tử suy nghĩ không vượt vị trí.","Twin mountains; the noble one's thoughts do not stray."],
  [5,7,"漸","Jiàn","Phong Sơn Tiệm","Gradual Development","女歸吉,利貞。","Gả con gái cát; lợi chính.","The maiden's marriage is fortunate; perseverance furthers.","Trên núi có cây; quân tử ở đức hiền, làm phong tục thiện.","Wood upon the mountain; the noble one dwells in virtue and refines custom."],
  [4,2,"歸妹","Guī Mèi","Lôi Trạch Quy Muội","The Marrying Maiden","征凶,无攸利。","Tiến hung; không lợi gì.","Advance brings misfortune; nothing furthers.","Trên đầm có sấm; quân tử biết kết cục, hiểu hư hao.","Thunder over the lake; the noble one foresees endings."],
  [4,3,"豐","Fēng","Lôi Hỏa Phong","Abundance","亨,王假之,勿憂,宜日中。","Hanh; vua đến; chớ lo; thích hợp giữa ngày.","Success; the king arrives; have no fear; the time is high noon.","Sấm chớp đều đến; quân tử xét án, định hình.","Thunder and lightning together; the noble one judges cases."],
  [3,7,"旅","Lǚ","Hỏa Sơn Lữ","The Wanderer","小亨,旅貞吉。","Tiểu hanh; lữ khách giữ chính cát.","Small success; the wanderer's perseverance brings fortune.","Trên núi có lửa; quân tử sáng cẩn dùng hình, không giữ ngục.","Fire upon the mountain; the noble one is clear with penalties."],
  [5,5,"巽","Xùn","Thuần Tốn","The Gentle Wind","小亨,利有攸往,利見大人。","Tiểu hanh; lợi tiến tới; lợi gặp đại nhân.","Small success; advance furthers; meeting the great one furthers.","Gió theo gió; quân tử công bố mệnh lệnh, làm việc.","Wind upon wind; the noble one repeats commands."],
  [2,2,"兌","Duì","Thuần Đoài","The Joyous Lake","亨,利貞。","Hanh; lợi chính.","Success; perseverance furthers.","Hai đầm liền; quân tử cùng bạn học hỏi.","Joined lakes; the noble one and friends study together."],
  [5,6,"渙","Huàn","Phong Thủy Hoán","Dispersion","亨。王假有廟,利涉大川,利貞。","Hanh; vua đến miếu; lợi vượt sông; lợi chính.","Success; the king visits the temple; cross the great water furthers.","Gió đi trên nước; tiên vương cúng tế Thượng đế lập miếu.","Wind moves over water; the kings worshipped and built temples."],
  [6,2,"節","Jié","Thủy Trạch Tiết","Limitation","亨,苦節不可貞。","Hanh; tiết quá khắc khổ không thể bền.","Success; bitter limitation cannot endure.","Trên đầm có nước; quân tử định số độ, bàn đức hạnh.","Water above the lake; the noble one sets standards."],
  [5,2,"中孚","Zhōng Fú","Phong Trạch Trung Phu","Inner Truth","豚魚吉,利涉大川,利貞。","Cá heo cát; lợi vượt sông; lợi chính.","Pigs and fish bring fortune; cross the great water.","Trên đầm có gió; quân tử bàn án, hoãn tử hình.","Wind over the lake; the noble one debates judgments."],
  [4,7,"小過","Xiǎo Guò","Lôi Sơn Tiểu Quá","Small Excess","亨,利貞,可小事,不可大事。","Hanh; lợi chính; tiểu sự khả; đại sự bất khả.","Success; perseverance; small matters yes, great ones no.","Trên núi có sấm; quân tử trong hành xử thì khiêm hơn.","Thunder atop the mountain; the noble one is more reverent."],
  [6,3,"既濟","Jì Jì","Thủy Hỏa Ký Tế","After Completion","亨小,利貞,初吉終亂。","Tiểu hanh; lợi chính; đầu cát cuối loạn.","Small success; first fortune, then disorder.","Nước trên lửa; quân tử nghĩ hoạn nạn để phòng trước.","Water above fire; the noble one anticipates trouble."],
  [3,6,"未濟","Wèi Jì","Hỏa Thủy Vị Tế","Before Completion","亨,小狐汔濟,濡其尾。","Hanh; cáo nhỏ gần qua sông, ướt đuôi.","Success; the little fox nearly across, wets its tail.","Lửa trên nước; quân tử phân biệt vật và ở đúng phương.","Fire above water; the noble one carefully sorts things."],
];

export const HEX = [null];
for (let i = 1; i <= 64; i++) {
  const row = HEX_ROWS[i];
  HEX[i] = {
    n: i,
    upper: row[0], lower: row[1],
    zh: row[2], py: row[3], vi: row[4], en: row[5],
    jZh: row[6], jVi: row[7], jEn: row[8],
    iVi: row[9], iEn: row[10],
  };
}

// Map from a 3-bit binary string (bottom-mid-top) to the trigram number 1–8.
export const TRIGRAM_BY_BINARY = {
  "111":1, "110":2, "101":3, "100":4, "011":5, "010":6, "001":7, "000":8,
};

export function getHex(upper, lower) {
  return HEX[HEX_BY_TRIGRAMS[upper][lower]];
}

// Returns the 6-bit binary string (line 1 = bottom, line 6 = top).
export function hexBinary(upper, lower) {
  return TRIGRAMS[lower].bin + TRIGRAMS[upper].bin;
}

// Language-aware name accessors
export function trigName(trigram, lang) { return lang === "zh" ? trigram.zh : lang === "vi" ? trigram.vi : trigram.en; }
export function trigAttr(trigram, lang) { return lang === "zh" ? trigram.attrZh : lang === "vi" ? trigram.attrVi : trigram.attrEn; }
export function trigFam(trigram, lang)  { return lang === "zh" ? trigram.famZh  : lang === "vi" ? trigram.famVi  : trigram.famEn; }
export function trigDir(trigram, lang)  { return lang === "zh" ? trigram.dirZh  : trigram.dirEn; }
export function hexName(hex, lang)      { return lang === "zh" ? hex.zh : lang === "vi" ? hex.vi : hex.en; }
export function hexJudg(hex, lang)      { return lang === "zh" ? hex.jZh : lang === "vi" ? hex.jVi : hex.jEn; }
export function hexImg(hex, lang)       { return lang === "vi" ? hex.iVi : hex.iEn; }
