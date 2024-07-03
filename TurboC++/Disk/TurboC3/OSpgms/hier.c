#include<stdio.h>
struct st
{
	char dname[10];
	char sdname[10][10];
	char ssdname[10][10][10];
	char fname[10][10][10][10];
	int ds,sds[10],ssds[10][10];
}dir[10];
void main()
{
	int i,j,k,n,l;
	printf("enter number of directories:");
	scanf("%d",&n);
	for(i=0;i<n;i++)
	{
		printf("enter directory %d names:",i+1);
		scanf("%s",&dir[i].dname);
		printf("enter size of directories:");
		scanf("%d",&dir[i].ds);
		for(j=0;j<dir[i].ds;j++)
		{
			printf("enter subdirectory name and size:");
			scanf("%s",&dir[i].sdname[j]);
			scanf("%d",&dir[i].sds[j]);
			for(k=0;k<dir[i].sds[j];k++)
			{
				 printf("enter the sub sub directory name and size:");
				 scanf("%s",dir[i].ssdname[j][k]);
				 scanf("%d",&dir[i].ssds[j][k]);
				 for(l=0;l<dir[i].ssds[j][k];l++)
				 {
					printf("enter file name:");
					scanf("%s",&dir[i].fname[j][k][l]);
				 }
			}
		}
	}
	printf("\ndirname\t\tsize\tsubdirname\tsize\tsubsubdirname\tsize\tfiles");
	printf("\n********************************************************************\n");
	for(i=0;i<n;i++)
	{
		printf("%s\t\t%d",dir[i].dname,dir[i].ds);
		for(j=0;j<dir[i].ds;j++)
		{
			printf("\t%s\t\t%d\t",dir[i].sdname[j],dir[i].sds[j]);
			for(k=0;k<dir[i].sds[j];k++)
			{
				 printf("\t%s\t%d\t",dir[i].ssdname[j][k],dir[i].ssds[j][k]);
 				 for(l=0;l<dir[i].ssds[j][k];l++)
				 	printf("%s\t",dir[i].fname[j][k][l]);
				printf("\n\t\t\t\t\t");
			}
		}
		printf("\n");  
	 }
}
