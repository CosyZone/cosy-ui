import { LangPackage } from "@coffic/cosy-ui";

export class MemberConfig {
	static getMembers = () => {
		return [
			{
				title: LangPackage.common("Coffic Lab"),
				image: "https://github.com/cofficlab.png",
				description: LangPackage.setEn("Our organization").setZh("我们的组织"),
				links: {
					github: "https://github.com/cofficlab",
				},
			},
			{
				image: "https://github.com/nookery.png",
				title: LangPackage.common("Nookery"),
				description:
					LangPackage.setEn("Work for joy").setZh("工作寻趣，生活有趣"),
				links: {
					github: "https://github.com/nookery",
				},
			},
			{
				image: "https://github.com/sunrunning.png",
				title: LangPackage.common("Sunrunning"),
				description: LangPackage.setEn("Almost a genius").setZh("几乎是个天才"),
				links: {
					github: "https://github.com/sunrunning",
				},
			},
			{
				title: LangPackage.common("Edith"),
				image: "https://github.com/foxsmarty.png",
				description: LangPackage.setEn("A girl who loves to code").setZh(
					"一个喜欢敲代码的女孩",
				),
				links: {
					github: "https://github.com/foxsmarty",
				},
			},
		];
	};
}
