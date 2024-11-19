'use client'

import { Footer } from "@/layout/footer"
import { Header } from "@/layout/header"
import { NavMobile } from "@/layout/nav-mobile"
import { IMAGES } from "@/utils/image"

export function AboutPage() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <Header />
            <NavMobile />
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center gap-10 mt-10 md:mt-0 lg:mt-0">
                <video className="w-full object-cover rounded-lg" autoPlay loop muted>
                    <source src={IMAGES.VIDEO_ABOUT} type="video/mp4" />
                </video>
                <div className="w-full h-1 bg-[rgb(var(--primary-rgb))]"></div>
                <div className="w-5/6 md:w-2/3 lg:w-2/3 text-center">
                    <h1 className="text-4xl font-bold text-[rgb(var(--quaternary-rgb))] mb-5">Về Chúng Tôi</h1>
                    <p className="text-lg text-[rgb(var(--quaternary-rgb))]">
                        Là công ty sản xuất và thương mại các sản phẩm thủ công mỹ nghệ truyền thống từ các nguyên liệu 100% từ thiên nhiên.
                    </p>
                </div>
                <div className="w-full flex flex-col md:flex-row lg:flex-row justify-center items-start gap-10">
                    <div className="w-full text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-5">Lịch Sử Hình Thành & Phát Triển</h1>
                        <p className="text-md text-[rgb(var(--quaternary-rgb))]">
                            Ecoka tiền thân là 1 cơ sở sản xuất thủ công với hơn 4 năm kinh nghiệm từ 2018 trong việc sản xuất hàng thủ công mỹ nghệ thân thiện với môi trường từ các nguyên liệu thiên nhiên sẵn có ở miền Tây Việt Nam: lục bình, cói, mây, tre…cho các khách hàng quốc tế: Mỹ, Anh, Pháp..
                            Với đội ngũ thợ thủ công lành nghề, được huấn luyện kỹ càng về các yêu cầu chất lượng sản phẩm, Ecoka đảm bảo mang lại những thành phẩm đa dạng trong mẫu mã, tinh tế trong từng thiết kế với chất lượng mang tầm quốc tế.
                            Đến với Ecoka, chắc chắn bạn sẽ hài lòng với phong cách phục vụ chuyên nghiệp, chất lượng sản phẩm đảm bảo và giá cả hợp lý.
                        </p>
                    </div>
                    <div className="w-full text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-5">Tầm Nhìn & Sứ Mệnh</h1>
                        <p className="text-md text-[rgb(var(--quaternary-rgb))]">
                            Trở thành một Thương hiệu Việt mang tầm quốc tế trong lĩnh vực sản xuất và xuất khẩu hàng hóa chất lượng với nguyên liệu thân thiện môi trường.
                            Không chỉ đem những điều tốt đẹp đến cho khách hàng, Ecoka còn muốn tạo ra nhiều cơ hội việc làm cho bà con nghèo miền Tây và định hướng nghề nghiệp cho các bạn trẻ, lấy việc bảo vệ môi trường làm tâm điểm kinh doanh.
                            Sứ mệnh của Ecoka là mang lại sản phẩm chất lượng, an toàn cho sức khỏe và môi trường, thay đổi thói quen tiêu dùng sản phẩm nhựa của nhiều người mà mục đích chính là đưa hàng Việt Nam chắp cánh trên thị trường quốc tế.
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row lg:flex-row justify-center items-start gap-10">
                    <div className="w-full text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-5">Giá Trị Cốt Lõi</h1>
                        <p className="text-md text-[rgb(var(--quaternary-rgb))]">
                            Trở hành biểu tượng niềm tin hàng đầu về chất lượng sản phẩm hàng tiêu dùng thân thiện môi trường cho cả thị trường Việt Nam và quốc tế.
                        </p>
                    </div>
                    <div className="w-full text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-5">Quy Mô & Cơ Sở Vật Chất</h1>
                        <p className="text-md text-[rgb(var(--quaternary-rgb))]">
                            <strong>Tổng diện tích:</strong> 6500 mét vuông bao gồm nhà xưởng, văn phòng, nhà sấy, phòng trưng bày, nhà kho và khu vực đóng gói.
                            <br />
                            <strong>Đội ngũ:</strong> 600 công nhân lành nghề trên 20 năm kinh nghiệm làm nghề thủ công truyền thống và được đào tạo bài bản về yêu cầu chất lượng sản phẩm.
                            <br />
                            <strong>Công suất:</strong> 80TEUS/tháng.
                            <br />
                            <strong>Thị trường chính hiện tại:</strong> Mỹ, CANADA, PHÁP.
                            <br />
                            Nhà cung cấp nguyên liệu cho các nhà máy trong nước.
                            <br />
                            Tùy chỉnh theo yêu cầu của khách hàng.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer />
        </div>
    )
}
