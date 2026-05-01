import Logo from "../../../assets/svg/logo-white.svg";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function AppFooter() {
    const { t } = useTranslation();
    return (
        <footer className="bg-primary text-white">
            {/* Main Footer */}
            <div className="px-4 sm:px-12 py-16 flex-col lg:flex-row flex gap-8 justify-between ">

                {/* Brand */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <img src={Logo} alt="Intera" className="w-36" />
                    </div>

                    <p className="max-w-sm text-sm text-white/80 leading-relaxed">
                        Banjarnegara, Jawa Tengah, Indonesia.
                        <br />
                        Ohnan Town, Shimane Prefecture, Japan.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {/* Pages */}
                    <div>
                        <h3 className="font-semibold mb-4">{t('footer.pages')}</h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li><a href="#" className="hover:text-white">{t('footer.about_us')}</a></li>
                            <li><a href="#" className="hover:text-white">{t('footer.feature')}</a></li>
                            <li><a href="#" className="hover:text-white">{t('footer.product')}</a></li>
                            <li><a href="#" className="hover:text-white">{t('footer.review')}</a></li>
                            <li><a href="#" className="hover:text-white">{t('footer.resources')}</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4">{t('footer.support')}</h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li><a href="#" className="hover:text-white">{t('footer.faqs')}</a></li>
                            <li><a href="#" className="hover:text-white">{t('footer.support_center')}</a></li>
                            <li><a href="#" className="hover:text-white">{t('footer.security')}</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20">
                <div className="px-6 lg:px-12 py-4 mx-auto flex flex-col items-center justify-center text-sm text-white/70 gap-4">
                    
                    <p>© {new Date().getFullYear()} Intera. {t('footer.rights_reserved')}</p>
                </div>
            </div>
        </footer>
    );
}
