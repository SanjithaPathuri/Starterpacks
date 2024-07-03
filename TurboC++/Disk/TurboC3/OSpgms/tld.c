#include<stdio.h>
struct direc
{
   char name[10];
   int size;
   struct file
   {
      char name[10],date[10];
   }f[5];
}d[5];
void main()
{
	int i,j,n,k;
	char a[10];
	printf("enter the main directory name:");
	scanf("%s",a);
	printf("enter no. of subdirectories:");
	scanf("%d",&n);
	for(i=1;i<=n;i++)
	{
		printf("\nenter directory%d name:",i);
	        scanf("%s",d[i].name);
		printf("enter size of directory%d:",i);
		scanf("%d",&d[i].size);
		for(j=0;j<d[i].size;j++)
		{
			printf("enter %d filename and date created:",j+1);
			scanf("%s %s",d[i].f[j].name,d[i].f[j].date);
			for(k=0;k<j;k++)
			{
				if(strcmp(d[i].f[j].name,d[i].f[k].name)==0)
				{
					printf("File already exists-enter other name,date:");
					scanf("%s %s",d[i].f[j].name,d[i].f[j].date);
					break;
				}
			}
		}
	}
        printf("\n\ndetails are:\n");
	printf("maindirctry\tsize\tsubdirctry\tsize\tfile\tdate\n");
	for(i=1;i<=n;i++)
	{
		for(j=0;j<d[i].size;j++)	
	        {
			printf("%s\t\t%d\t%s\t\t%d\t%s\t%s\n",a,n,d[i].name,d[i].size,d[i].f[j].name,d[i].f[j].date);
		}
	}
}


